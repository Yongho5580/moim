import { KAKAO_PROFILE_URL, KAKAO_TOKEN_URL } from "@/constants/endpoint";

export async function getKakaoToken(redirectUri: string, code: string) {
  const params = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: redirectUri,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();

  const url = `${KAKAO_TOKEN_URL}?${formattedParams}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  const { access_token } = await response.json();

  return { access_token };
}

export async function getKakaoProfile(token: string) {
  const response = await fetch(KAKAO_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { nickName, profileImageURL } = await response.json();

  return { nickName, profileImageURL };
}
