import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  // Order matters because of foreign keys
  await client.query("DELETE FROM products;");
  await client.query("DELETE FROM categories;");

  // Reset IDs
  await client.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;");
  await client.query("ALTER SEQUENCE categories_id_seq RESTART WITH 1;");

  await client.end();

  return {
    statusCode: 200,
    body: "Database reset successful"
  };
}
