import { Client } from "pg";

export async function handler(event) {
  const { name, slug, description } = JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  await client.query(
    "INSERT INTO categories (name, slug, description) VALUES ($1,$2,$3)",
    [name, slug, description]
  );

  await client.end();
  return { statusCode: 200, body: "Category added" };
}
