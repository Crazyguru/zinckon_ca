import { Client } from "pg";

export async function handler() {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  const res = await client.query(
    "SELECT * FROM categories ORDER BY id DESC"
  );

  await client.end();
  return { statusCode: 200, body: JSON.stringify(res.rows) };
}
