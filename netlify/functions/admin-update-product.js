import { Client } from "pg";

export async function handler(event) {
  const {
    id,
    name,
    description,
    price,
    image_url,
    category_id,
    is_active
  } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  await client.connect();

  await client.query(
    `UPDATE products
     SET name=$1,
         description=$2,
         price=$3,
         image_url=$4,
         category_id=$5,
         is_active=$6
     WHERE id=$7`,
    [name, description, price, image_url, category_id, is_active, id]
  );

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
