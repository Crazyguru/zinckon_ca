import { Client } from "pg";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, slug, description, image_url } = JSON.parse(event.body);

  if (!name || !slug) {
    return { statusCode: 400, body: "Name and slug required" };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  await client.query(
    `
    INSERT INTO categories (name, slug, description, image_url)
    VALUES ($1, $2, $3, $4)
    `,
    [name, slug, description, image_url]
  );

  await client.end();

  return {
    statusCode: 200,
    body: "Category added"
  };
}
