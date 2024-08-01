import { GITHUB_AUTHORIZE_URL } from "@/constants/endpoint";
import { redirect } from "next/navigation";

export async function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup: "true",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${GITHUB_AUTHORIZE_URL}?${formattedParams}`;

  return redirect(url);
}
