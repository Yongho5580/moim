import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface IUserInfoProps {
  userId: number;
  avatar: string;
  username: string;
  createdAt: Date;
}

export default function UserInfo({
  userId,
  avatar,
  username,
  createdAt,
}: IUserInfoProps) {
  return (
    <Link href={`/user/${userId}`} className="flex items-center gap-2 mb-2">
      <Image
        width={28}
        height={28}
        className="size-7 rounded-full"
        src={avatar}
        alt={username}
      />
      <div>
        <span className="text-sm font-semibold">{username}</span>
        <div className="text-xs">
          <span>{formatToTimeAgo(createdAt.toString())}</span>
        </div>
      </div>
    </Link>
  );
}
