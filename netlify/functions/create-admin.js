import bcrypt from "bcryptjs";
import { Client } from "pg";

export async function handler(event) {
  const { email, password } = JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const res = await client.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  await client.end();

  if (res.rows.length === 0) {
    return { statusCode: 401, body: "Invalid credentials" };
  }

  const user = res.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return { statusCode: 401, body: "Invalid credentials" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      role: user.role
    })
  };
}
