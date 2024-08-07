"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function createChatRoom(receiverId: number) {
  const session = await getSession();
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [
          {
            id: receiverId,
          },
          {
            id: session.id,
          },
        ],
      },
    },
    select: {
      id: true,
    },
  });

  redirect(`/chats/${room.id}`);
}

export async function getChatRoom(roomId: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });
  console.log(room);
  return room;
}
