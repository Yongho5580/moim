import { GOOGLE_AUTHORIZE_URL } from "@/constants/endpoint";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${request.nextUrl.origin}/google/callback`,
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  };

  const formattedParams = new URLSearchParams(params).toString();

  const url = `${GOOGLE_AUTHORIZE_URL}?${formattedParams}`;

  return redirect(url);
}
