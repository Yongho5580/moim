import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getUnReadMessages } from "@/actions/chats";

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
      className="pb-5 mb-5 border-b border-neutral-500 flex flex-col gap-2 last:pb-0 last:border-b-0"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={50}
            height={50}
            className="size-10 rounded-full"
            src={avatar}
            alt={username}
          />
          <div>
            <span className="text-base font-semibold text-neutral-300">
              {username}
            </span>
            <div className={`flex gap-1 *:text-sm`}>
              <span
                className={`${
                  isSender
                    ? "text-neutral-400"
                    : isRead
                    ? "text-neutral-400"
                    : "text-neutral-300"
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
                    : "text-neutral-300"
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
                    : "text-neutral-300"
                }`}
              >
                {formatToTimeAgo(createdAt.toString())}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="inline-flex items-center justify-center w-8 h-6 ms-2  text-xs font-semibold text-slate-200 bg-emerald-800 rounded-lg">
      {unReadMessagesCount}
    </div> */}
      </div>
    </Link>
  );
}
