import bcrypt from "bcryptjs";
import { Client } from "pg";

export async function handler(event) {
  try {
    const { email, password } = JSON.parse(event.body);

    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query(
      `
      SELECT id, email, password_hash, role, is_active
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return { statusCode: 401, body: "Invalid login" };
    }

    const user = result.rows[0];

    if (!user.is_active || user.role !== "admin") {
      return { statusCode: 401, body: "Invalid User" };
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return { statusCode: 401, body: "Invalid Password" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role
      })
    };

  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
