import {
  ACCESS_EMAIL_URL,
  ACCESS_TOKEN_URL,
  ACCESS_USER_URL,
} from "@/constants/endpoint";
import { NextRequest } from "next/server";

interface IGithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function getAccessToken(code: string) {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${ACCESS_TOKEN_URL}?${formattedParams}`;
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
  const response = await fetch(ACCESS_USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await response.json();
  return { id, avatar_url, login };
}

export async function getGithubEmail(token: string) {
  const response = await fetch(ACCESS_EMAIL_URL, {
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
