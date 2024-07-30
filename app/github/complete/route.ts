import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${ACCESS_TOKEN_URL}?${formattedParams}`;
  const accessTokenResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const accessTokenJson = await accessTokenResponse.json();
  if ("error" in accessTokenJson) {
    return new Response(null, {
      status: 400,
    });
  }
  return Response.json({ accessTokenJson });
}
