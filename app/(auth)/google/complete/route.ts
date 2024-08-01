import { db } from "@/lib/db";
import { getGoogleProfile } from "@/lib/google";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("access_token");

  if (!token) {
    return new Response(null, {
      status: 400,
    });
  }

  const { email, id, name, picture } = await getGoogleProfile(token);

  const usernameExists = await db.user.findUnique({
    where: {
      username: name,
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
      email,
      username: name,
      avatar: picture,
      auth_type: "google",
    },
  });
  await setSession(newUser.id);

  return redirect("/profile");
}
