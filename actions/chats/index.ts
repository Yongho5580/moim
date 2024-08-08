"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
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

  return redirect(`/chats/${room.id}`);
}

export async function getChatRooms() {
  const session = await getSession();

  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        // 관계된 레코드 중 하나라도 조건을 만족하는 경우
        some: {
          id: {
            equals: session.id,
          },
        },
      },
    },
    select: {
      id: true,
      messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
        select: {
          userId: true,
          payload: true,
          created_at: true,
          isRead: true,
        },
      },
      users: {
        where: {
          id: {
            not: session.id,
          },
        },
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return chatRooms;
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
      isRead: true,
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

export async function saveMessage(
  payload: string,
  chatRoomId: string,
  isRead: boolean
) {
  const session = await getSession();
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
      isRead,
    },
    select: {
      id: true,
    },
  });
}
export async function markMessagesAsRead(chatRoomId: string) {
  await db.message.updateMany({
    where: {
      chatRoomId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  revalidatePath("/chats");
}

export async function getUnReadMessages(chatRoomId: string) {
  const session = await getSession();
  const unReadMessagesCount = await db.message.count({
    where: {
      chatRoomId,
      userId: {
        not: session.id,
      },
      isRead: false,
    },
  });

  return unReadMessagesCount;
}
