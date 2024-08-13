import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser(id: number) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  if (user) {
    return user;
  }
  return notFound();
}

export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect("/");
}
