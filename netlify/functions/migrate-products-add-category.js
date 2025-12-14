import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  await client.query(`
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS category_id INT;
  `);

  await client.query(`
    ALTER TABLE products
    ADD CONSTRAINT fk_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE;
  `);

  await client.end();

  return {
    statusCode: 200,
    body: "Migration applied: category_id added"
  };
}
