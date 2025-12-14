import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  await client.query(`
    INSERT INTO products (category_id, name, description, price, image_url)
    VALUES
    (
      (SELECT id FROM categories WHERE slug = 'pharmaceuticals'),
      'Acetonitrile',
      'High purity laboratory solvent used in pharmaceutical synthesis.',
      1200,
      '/images/acetonitrile.jpg'
    ),
    (
      (SELECT id FROM categories WHERE slug = 'pharmaceuticals'),
      'Methanol',
      'Industrial and pharmaceutical grade methanol.',
      900,
      '/images/methanol.jpg'
    ),
    (
      (SELECT id FROM categories WHERE slug = 'brewing'),
      'Zinc Sulphate',
      'Supports yeast growth and fermentation performance.',
      600,
      '/images/zinc.jpg'
    );
  `);

  await client.end();

  return {
    statusCode: 200,
    body: "Seed products inserted"
  };
}
