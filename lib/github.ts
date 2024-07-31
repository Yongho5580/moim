import {
  GITHUB_EMAIL_URL,
  GITHUB_TOKEN_URL,
  GITHUB_USER_URL,
} from "@/constants/endpoint";

interface IGithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function getGithubToken(code: string) {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${GITHUB_TOKEN_URL}?${formattedParams}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await response.json();
  return { error, access_token };
}

export async function getGithubProfile(token: string) {
  const response = await fetch(GITHUB_USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await response.json();
  return { id, avatar_url, login };
}

export async function getGithubEmail(token: string) {
  const response = await fetch(GITHUB_EMAIL_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const data: IGithubEmail[] = await response.json();

  const email = data.filter((email) => email.primary && email.verified)[0]
    .email;

  return { email };
}
