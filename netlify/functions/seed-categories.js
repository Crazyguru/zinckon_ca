import { Client } from "pg";

export async function handler() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  await client.connect();

  const categories = [
    {
      name: "Pharmaceuticals, Veterinarian Preparations, Nutraceuticals",
      slug: "pharmaceuticals",
      description:
        "Liquid and solid drugs along with nutritional supplements are used every day in human and veterinarian applications. Mineral salts in such products aid to positively influence the biochemical process in the organism.",
      image_url: "/images/product-category/Pharma.jpg",
    },
    {
      name: "Infant Formulas & Clinical Food",
      slug: "infant-formulas",
      description:
        "Besides breast milk, infant formula is the only acceptable nutrition for infants under one year. These formulas contain purified whey, casein proteins, vegetable oils, lactose, vitamins and mineral salts.",
      image_url: "/images/product-category/baby-food2.jpg",
    },
    {
      name: "Infusion & Dialysis Solutions",
      slug: "infusion-dialysis",
      description:
        "Infusion solutions using mineral salts and glucose provide fast intravenous delivery. Dialysis removes waste through a semi-permeable membrane into a mineral-salt dialysis solution.",
      image_url: "/images/product-category/dialysis.jpg",
    },
    {
      name: "Bottled Mineralised Water",
      slug: "bottled-water",
      description:
        "Reverse osmosis purification removes contaminants, while mineral salts are added to improve taste and health effect with low bromide minerals.",
      image_url: "/images/product-category/water.jpg",
    },
    {
      name: "Seawater Aquariums",
      slug: "seawater-aquariums",
      description:
        "Pure pharmaceutical-grade mineral salts ensure the natural health and stability of seawater aquarium ecosystems.",
      image_url: "/images/product-category/seawater.jpg",
    },
    {
      name: "Glycerophosphates",
      slug: "glycerophosphates",
      description:
        "High bioavailability minerals in their most stable form for effective absorption and performance.",
      image_url: "/images/product-category/glycerophosphate.jpg",
    },
    {
      name: "Biopharmaceuticals",
      slug: "biopharmaceuticals",
      description:
        "Mineral salts are essential in upstream processing for cultivating and purifying biologically derived drugs.",
      image_url: "/images/product-category/biopharmaceutical.jpg",
    },
    {
      name: "Brewing",
      slug: "brewing",
      description:
        "Zinc sulphate supports yeast growth, and calcium salts adjust hardness and pH for perfect fermentation.",
      image_url: "/images/product-category/brewing.jpg",
    },
    {
      name: "Bakery",
      slug: "bakery",
      description:
        "Calcium Propionate prevents mold growth, and sodium chloride is partially replaced with potassium chloride to reduce sodium.",
      image_url: "/images/product-category/bakery.jpg",
    },
    {
      name: "Flavouring",
      slug: "flavouring",
      description:
        "Sodium Acetate is used in seasoning and Sodium Di-acetate in salt & vinegar chips. Potassium Chloride supports sodium reduction in spices.",
      image_url: "/images/product-category/flavours.jpg",
    },
  ];

  for (const c of categories) {
    await client.query(
      `
      INSERT INTO categories (name, slug, description, image_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (slug) DO NOTHING
      `,
      [c.name, c.slug, c.description, c.image_url]
    );
  }

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Categories seeded successfully",
    }),
  };
}
