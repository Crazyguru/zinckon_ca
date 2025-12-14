import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  const result = await client.query(`
    SELECT id, name, slug, description
    FROM categories
    ORDER BY id;
  `);

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify(result.rows)
  };
}
