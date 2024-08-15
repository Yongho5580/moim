import { db } from "@/lib/db";
import { getGoogleProfile } from "@/lib/google";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // check URL params
  const token = request.nextUrl.searchParams.get("access_token");
  if (!token) {
    return new Response(null, {
      status: 400,
    });
  }
  // Get Profile
  const { email, id, name, picture } = await getGoogleProfile(token);
  // Check is user already create account with Google
  const user = await db.user.findUnique({
    where: {
      auth_id: id,
      auth_type: "google",
    },
  });
  if (user) {
    await setSession(user.id);
    return redirect("/home");
  } else {
    // if user not exists
    const newUser = await db.user.create({
      data: {
        auth_id: String(id),
        email,
        username: name,
        avatar: picture,
        auth_type: "google",
      },
    });
    await setSession(newUser.id);
    return redirect("/home");
  }
}
