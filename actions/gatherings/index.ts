"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
export async function getIsOwner(userId: number) {
  // const session = await getSession();

  // if (session.id) {
  //   return session.id === userId;
  // }
  return false;
}

export async function getGathering(gatheringId: number) {
  const gathering = await db.gathering.findUnique({
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
  const gatherings = db.gathering.findMany({
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
  const gatherings = await db.gathering.findMany({
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
