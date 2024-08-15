import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface SessionContents {
  id: number;
}

export default function getSession() {
  const session = getIronSession<SessionContents>(cookies(), {
    cookieName: "moim-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (!session) {
    return notFound();
  }
  return session;
}

export async function setSession(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
