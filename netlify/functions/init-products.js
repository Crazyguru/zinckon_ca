import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10,2),
      image_url TEXT,
      category_id INT REFERENCES categories(id),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await client.end();
  return { statusCode: 200, body: "Products table ready" };
}
