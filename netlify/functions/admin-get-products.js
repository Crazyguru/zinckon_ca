import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  const result = await client.query(`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.image_url,
      c.name AS category
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ORDER BY p.id DESC;
  `);

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify(result.rows)
  };
}
