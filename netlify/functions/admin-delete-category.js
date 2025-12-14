import { Client } from "pg";

export async function handler(event) {
  const { id } = JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();
  await client.query("DELETE FROM categories WHERE id=$1", [id]);
  await client.end();

  return { statusCode: 200, body: "Deleted" };
}
