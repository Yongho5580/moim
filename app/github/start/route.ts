const BASE_URL = "https://github.com/login/oauth/authorize";

export async function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup: "true",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}?${formattedParams}`;

  return Response.redirect(url);
}
