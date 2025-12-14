import { Client } from "pg";

export async function handler(event) {
  const category = event.queryStringParameters.category;

  if (!category) {
    return { statusCode: 400, body: "Category missing" };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  const result = await client.query(`
    SELECT p.*
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE c.slug = $1
    ORDER BY p.id DESC
  `, [category]);

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify(result.rows)
  };
}
