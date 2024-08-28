import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      communityPost: {
        select: {
          id: true,
          title: true,
          description: true,
          views: true,
          _count: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      participants: {
        select: {
          gathering: {
            select: {
              id: true,
              title: true,
              price: true,
              description: true,
              photo: true,
              status: true,
              endDate: true,
              location: true,
              created_at: true,
              userId: true,
            },
          },
        },
        orderBy: {
          gathering: {
            created_at: "desc",
          },
        },
      },
    },
  });

  if (user) {
    const gatheringPost = user.participants.map(
      (participant) => participant.gathering
    );
    return {
      ...user,
      gatheringPost,
    };
  }
  return notFound();
}

export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect("/login");
}
