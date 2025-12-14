// netlify/functions/seed-admin.js
import bcrypt from "bcryptjs";
import { Client } from "pg";

export async function handler() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const hash = await bcrypt.hash("ChangeThisPassword123", 10);

  await client.query(
    `INSERT INTO users (email, password_hash, role, is_active)
     VALUES ($1, $2, 'admin', true)
     ON CONFLICT (email) DO NOTHING`,
    ["admin@zinckon.com", hash]
  );

  await client.end();

  return {
    statusCode: 200,
    body: "Admin user ready"
  };
}
