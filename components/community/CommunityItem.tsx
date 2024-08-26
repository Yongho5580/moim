import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface ICommunityItemProps {
  id: number;
  title: string;
  description: string;
  _count: {
    comments: number;
    likes: number;
  };
  views: number;
  created_at: Date;
}

export default function CommunityItem({
  id,
  title,
  description,
  views,
  created_at,
  _count: { comments, likes },
}: ICommunityItemProps) {
  return (
    <Link
      key={id}
      href={`/community/${id}`}
      className="py-5 border-b border-gray-200 flex flex-col gap-2 last:pb-0 last:border-b-0"
    >
      <h2 className="text-lg font-semibold ">{title}</h2>
      <p className="line-clamp-2 text-base text-gray-500">{description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2 items-center *:text-gray-400">
          <span>{formatToTimeAgo(created_at.toString())}</span>
          <span>·</span>
          <span>조회 {views}</span>
        </div>
        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
          <span>
            <HeartIcon className="size-4 text-red-500" />
            {likes}
          </span>
          <span>
            <ChatBubbleBottomCenterIcon className="size-4 text-blue-400" />
            {comments}
          </span>
        </div>
      </div>
    </Link>
  );
}
