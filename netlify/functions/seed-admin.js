import bcrypt from "bcryptjs";
import { Client } from "pg";

export async function handler(event, context) {
  try {
    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const hash = await bcrypt.hash("aafreen@123", 10);

    await client.query(
      `
      INSERT INTO users (email, password_hash, role, is_active)
      VALUES ($1, $2, 'admin', true)
      ON CONFLICT (email) DO NOTHING
      `,
      ["aafreen@zinckon.com", hash]
    );

    await client.end();

    return {
      statusCode: 200,
      body: "Admin seeded successfully aafreen"
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}
