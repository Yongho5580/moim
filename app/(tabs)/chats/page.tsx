import { getChatRooms } from "@/actions/chats";
import ChatRoomItem from "@/components/chats/ChatRoomItem";
import getSession from "@/lib/session";

export default async function Chats() {
  const chatRooms = await getChatRooms();
  const session = await getSession();
  const isSender = chatRooms[0].messages[0]?.userId === session.id;

  console.log(chatRooms);

  return (
    <div className="flex flex-col py-5 gap-5">
      {chatRooms.map((chatRoom) => (
        <ChatRoomItem
          key={chatRoom.id}
          chatRoomId={chatRoom.id}
          isRead={chatRoom.messages[0]?.isRead}
          isSender={isSender}
          createdAt={chatRoom.messages[0]?.created_at}
          payload={chatRoom.messages[0]?.payload}
          username={chatRoom.users[0].username}
          avatar={chatRoom.users[0].avatar!}
        />
      ))}
    </div>
  );
}
