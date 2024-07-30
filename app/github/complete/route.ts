import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const ACCESS_USER_URL = "https://api.github.com/user";

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
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch(ACCESS_USER_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/profile");
  } else {
    // solve this problem (duplicate username who login by email)
    const newUser = await db.user.create({
      data: {
        username: login,
        github_id: String(id),
        avatar: avatar_url,
      },
    });
    const session = await getSession();
    session.id = newUser.id;
    await session.save();
    return redirect("/profile");
  }
}
