import { db } from "@/lib/db";
import { getAccessToken, getGithubEmail, getGithubProfile } from "@/lib/github";
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
  // Access Token
  const { access_token, error } = await getAccessToken(code);
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
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  // if user exists
  if (user) {
    await setSession(user.id);
    return redirect("/profile");
  } else {
    // if user not exists
    const { email } = await getGithubEmail(access_token);
    const usernameExists = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    // username, email validate
    if (usernameExists) {
      return redirect("/login/error?message=username_duplicate");
    } else if (emailExists) {
      return redirect("/login/error?message=email_duplicate");
    }
    // create new github account
    const newUser = await db.user.create({
      data: {
        username,
        email,
        github_id: String(id),
        avatar: avatar_url,
      },
    });
    await setSession(newUser.id);
    return redirect("/");
  }
}
