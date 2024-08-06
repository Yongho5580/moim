import { EyeIcon } from "@heroicons/react/24/solid";
import LikeButton from "./LikeButton";

interface IPostStatsProps {
  views: number;
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function PostStats({
  views,
  postId,
  isLiked,
  likeCount,
}: IPostStatsProps) {
  return (
    <div className="flex flex-col gap-5 items-start border-b-slate-200 border-b">
      <div className="flex items-center gap-2 text-neutral-400 text-sm">
        <EyeIcon className="size-5" />
        <span>조회 {views}</span>
      </div>
      <LikeButton postId={postId} isLiked={isLiked} likeCount={likeCount} />
    </div>
  );
}
