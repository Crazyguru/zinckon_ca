export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, password } = JSON.parse(event.body);

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: "zinckon-admin-auth"
      })
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({
      success: false,
      message: "Invalid credentials"
    })
  };
}
