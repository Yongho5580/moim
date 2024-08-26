import { getChatRoom, getMessages } from "@/actions/chats";
import { getUser } from "@/actions/profile";
import ChatMessages from "@/components/chats/ChatMessages";
import getSession from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = await getChatRoom(params.id);
  const session = await getSession();
  const username = room?.users.filter((user) => user.id !== session.id);

  return {
    title: `${username?.[0].username}님과의 채팅`,
  };
}

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getChatRoom(params.id);
  const session = await getSession();
  if (!room || !session.id) {
    return notFound();
  } else {
    const hasChatRoomAccess = Boolean(
      room.users.find((user) => user.id === session.id)
    );
    if (!hasChatRoomAccess) {
      return notFound();
    }
  }

  const { username, avatar } = await getUser(session.id);
  const initialMessages = await getMessages(params.id);

  return (
    <div>
      <ChatMessages
        chatRoomId={params.id}
        userId={session.id!}
        username={username}
        avatar={avatar!}
        initialMessages={initialMessages}
      />
    </div>
  );
}
