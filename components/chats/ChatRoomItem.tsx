import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IChatRoomItemProps {
  chatRoomId: string;
  payload: string;
  username: string;
  avatar: string;
  createdAt: Date;
  isRead: boolean;
  isSender: boolean;
}

export default function ChatRoomItem({
  chatRoomId,
  payload,
  username,
  avatar,
  createdAt,
  isRead,
  isSender,
}: IChatRoomItemProps) {
  return (
    <Link
      href={`/chats/${chatRoomId}`}
      className="border-b border-neutral-300 flex flex-col gap-2 py-5 px-side"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-2">
          <Image
            width={56}
            height={56}
            className="size-14 rounded-full"
            src={avatar}
            alt={username}
          />
          <div>
            <span className="text-base font-semibold text-neutral-800">
              {username}
            </span>
            <div className={`flex gap-1 *:text-sm`}>
              <span
                className={`${
                  isSender
                    ? "text-neutral-400"
                    : isRead
                    ? "text-neutral-400"
                    : "text-neutral-900 font-semibold"
                }`}
              >
                {payload}
              </span>
              <span
                className={`${
                  isSender
                    ? "text-neutral-400"
                    : isRead
                    ? "text-neutral-400"
                    : "text-neutral-900 font-semibold"
                }`}
              >
                ·
              </span>
              <span
                className={`${
                  isSender
                    ? "text-neutral-400"
                    : isRead
                    ? "text-neutral-400"
                    : "text-neutral-900 font-semibold"
                }`}
              >
                {formatToTimeAgo(createdAt?.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
