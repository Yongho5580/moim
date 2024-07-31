import { GOOGLE_TOKEN_URL } from "@/constants/endpoint";

export async function getGoogleToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const access_token = params.get("access_token");

  return { access_token };
}

export async function getGoogleProfile(token: string) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { email, name, id, picture } = await response.json();

  return { email, name, id, picture };
}
