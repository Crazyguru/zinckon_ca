import bcrypt from "bcryptjs";
import { Client } from "pg";

export async function handler(event) {
  const { email, password } = JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  const result = await client.query(
    "SELECT * FROM users WHERE email=$1 AND role='admin' AND is_active=true",
    [email]
  );

  await client.end();

  if (result.rowCount === 0) {
    return { statusCode: 401, body: "Invalid credentials" };
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return { statusCode: 401, body: "Invalid credentials" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role
    })
  };
}
