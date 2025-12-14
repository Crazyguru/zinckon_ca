import { Client } from "pg";

export async function handler(event) {
  const { name, description, price, image_url, category_id } =
    JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  await client.query(
    `INSERT INTO products
     (name, description, price, image_url, category_id)
     VALUES ($1,$2,$3,$4,$5)`,
    [name, description, price, image_url, category_id]
  );

  await client.end();
  return { statusCode: 200, body: "Product added" };
}
