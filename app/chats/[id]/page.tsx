import { getChatRoom, getMessages } from "@/actions/chats";
import ChatMessages from "@/components/chats/ChatMessages";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getChatRoom(params.id);
  if (!room) {
    return notFound();
  } else {
    const session = await getSession();
    const hasChatRoomAccess = Boolean(
      room.users.find((user) => user.id === session.id)
    );
    if (!hasChatRoomAccess) {
      return notFound();
    }
  }
  const initialMessages = await getMessages(params.id);
  const session = await getSession();

  return (
    <div>
      <ChatMessages
        chatRoomId={params.id}
        userId={session.id!}
        initialMessages={initialMessages}
      />
    </div>
  );
}
