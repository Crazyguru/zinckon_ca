import crypto from "crypto";

export async function handler(event) {
  const { email, password } = JSON.parse(event.body || "{}");

  // 👇 CHANGE THESE
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" })
    };
  }

  // simple signed token
  const token = crypto
    .createHash("sha256")
    .update(email + Date.now())
    .digest("hex");

  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      message: "Login successful"
    })
  };
}
