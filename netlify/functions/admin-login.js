import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { email, password } = JSON.parse(event.body || "{}");

  if (!email || !password) {
    return { statusCode: 400, body: "Missing credentials" };
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, password_hash, role, is_active 
       FROM users 
       WHERE email = $1 AND role = 'admin'`,
      [email]
    );

    if (!rows.length || !rows[0].is_active) {
      return { statusCode: 401, body: "Invalid login" };
    }

    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) {
      return { statusCode: 401, body: "Invalid password" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        adminId: rows[0].id
      })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
}
