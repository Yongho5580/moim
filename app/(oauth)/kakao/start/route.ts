import { KAKAO_AUTHORIZE_URL } from "@/constants/endpoint";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = {
    response_type: "code",
    client_id: process.env.KAKAO_CLIENT_ID!,
    scope: "openid",
    redirect_uri: `${request.nextUrl.origin}/kakao/complete`,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${KAKAO_AUTHORIZE_URL}?${formattedParams}`;

  return redirect(url);
}
