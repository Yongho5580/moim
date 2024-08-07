"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
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

export async function getChatRoom(chatRoomId: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id: chatRoomId,
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

export type InitialChatRoomMessages = Prisma.PromiseReturnType<
  typeof getMessages
>;

export async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return messages;
}
