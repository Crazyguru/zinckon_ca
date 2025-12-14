import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL
  });

  await client.connect();

  await client.query(`
    INSERT INTO categories (name, slug, description, image_url)
    VALUES
    (
      'Pharmaceuticals',
      'pharmaceuticals',
      'Pharmaceutical and nutraceutical products',
      '/images/product-category/Pharma.jpg'
    ),
    (
      'Infant Nutrition',
      'infant-nutrition',
      'Infant formulas and clinical food',
      '/images/product-category/baby-food2.jpg'
    ),
    (
      'Brewing',
      'brewing',
      'Brewing and fermentation minerals',
      '/images/product-category/brewing.jpg'
    );
  `);

  await client.end();

  return {
    statusCode: 200,
    body: "Seed categories inserted"
  };
}
