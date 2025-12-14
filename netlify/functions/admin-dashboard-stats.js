import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });
  await client.connect();

  const c1 = await client.query("SELECT COUNT(*) FROM categories");
  const c2 = await client.query("SELECT COUNT(*) FROM products");

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({
      categories: c1.rows[0].count,
      products: c2.rows[0].count
    })
  };
}
