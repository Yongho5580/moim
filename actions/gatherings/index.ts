"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export async function getIsOwner(userId: number) {
  const session = await getSession();

  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getGathering(gatheringId: number) {
  console.log("get gathering hit!");
  const gathering = await db.gatheringPost.findUnique({
    where: {
      id: gatheringId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return gathering;
}

export type InitialGatherings = Prisma.PromiseReturnType<
  typeof getInitialGatherings
>;

export async function getInitialGatherings() {
  const gatherings = db.gatheringPost.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      photo: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return gatherings;
}

export async function getMoreGatherings(page: number) {
  const gatherings = await db.gatheringPost.findMany({
    select: {
      title: true,
      location: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return gatherings;
}

export async function getCachedGatheringPost(postId: number) {
  const getCachedGathering = unstable_cache(getGathering, ["gathering-post"], {
    tags: ["gathering-post"],
  });

  return getCachedGathering(postId);
}
