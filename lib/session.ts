import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContents {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContents>(cookies(), {
    cookieName: "moim-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function setSession(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
