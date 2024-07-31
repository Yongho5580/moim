import { db } from "@/lib/db";
import { getKakaoProfile, getKakaoToken } from "@/lib/kakao";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const redirectUri = `${request.nextUrl.origin}/kakao/complete`;

  const { access_token } = await getKakaoToken(redirectUri, code);
  const { nickName, profileImageURL } = await getKakaoProfile(access_token);

  const usernameExists = await db.user.findUnique({
    where: {
      username: nickName,
    },
    select: {
      id: true,
    },
  });
  // username validate
  if (usernameExists) {
    return redirect("/login/error?message=username_duplicate");
  }

  const newUser = await db.user.create({
    data: {
      username: nickName,
      avatar: profileImageURL,
      auth_type: "kakao",
    },
  });
  await setSession(newUser.id);

  return redirect("/profile");
}
