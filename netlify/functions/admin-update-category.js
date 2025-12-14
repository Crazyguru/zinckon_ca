import { Client } from "pg";

export async function handler(event) {
  const { id, name, slug, description } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  await client.connect();

  await client.query(
    `UPDATE categories
     SET name=$1, slug=$2, description=$3
     WHERE id=$4`,
    [name, slug, description, id]
  );

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
