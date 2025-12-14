import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    await client.connect();

    await client.query(`
      INSERT INTO products (name, description, price, image_url)
      VALUES
      (
        'Low Sodium Salt',
        'High purity low sodium salt suitable for industrial and food applications.',
        250.00,
        '/images/low-sodium.jpg'
      ),
      (
        'Acetonitrile',
        'Laboratory-grade acetonitrile solvent with high purity.',
        1200.00,
        '/images/acetonitrile.jpg'
      ),
      (
        'Methanol',
        'Industrial grade methanol used in chemical processing.',
        900.00,
        '/images/methanol.jpg'
      );
    `);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Demo products inserted successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
