import { db } from "@/lib/db";
import { getGithubToken, getGithubEmail, getGithubProfile } from "@/lib/github";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // check URL params
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  // Github Token
  const { access_token, error } = await getGithubToken(code);
  if (error) {
    return new Response(null, {
      status: 500,
    });
  }
  // Github Profile with Access Token
  const {
    id,
    login: username,
    avatar_url,
  } = await getGithubProfile(access_token);
  // Check is user already create account with github
  const user = await db.user.findUnique({
    where: {
      auth_id: String(id),
      auth_type: "github",
    },
    select: {
      id: true,
    },
  });
  // if user exists
  if (user) {
    await setSession(user.id);
    return redirect("/home");
  } else {
    // if user not exists
    const { email } = await getGithubEmail(access_token);
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (emailExists) {
      return redirect("/login");
    }
    // create new github account
    const newUser = await db.user.create({
      data: {
        username,
        email,
        auth_id: String(id),
        auth_type: "github",
        avatar: avatar_url,
      },
    });
    await setSession(newUser.id);
    return redirect("/home");
  }
}
