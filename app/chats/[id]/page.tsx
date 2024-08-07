import { getChatRoom } from "@/actions/chats";
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

  return <div>chatRoom</div>;
}
