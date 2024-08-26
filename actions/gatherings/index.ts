"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export async function getIsOwner(userId: number, sessionId: number) {
  if (sessionId) {
    return sessionId === userId;
  }
  return false;
}

export async function getGathering(gatheringId: number) {
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
      participants: true,
    },
  });
  return gathering;
}

export type InitialGatherings = Prisma.PromiseReturnType<
  typeof getInitialGatherings
>;

export async function getInitialGatherings() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const gatherings = db.gatheringPost.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      photo: true,
      created_at: true,
      maxParticipants: true,
      participants: true,
      status: true,
      endDate: true,
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
      id: true,
      title: true,
      location: true,
      price: true,
      photo: true,
      created_at: true,
      maxParticipants: true,
      participants: true,
      status: true,
      endDate: true,
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
  const getCachedGathering = unstable_cache(
    getGathering,
    [`gathering-post-${postId}`],
    {
      tags: [`gathering-post-${postId}`],
    }
  );

  return getCachedGathering(postId);
}
