import {
  getCachedCommunityPost,
  getCachedLikeStatus,
} from "@/actions/community";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommunityLikeButton from "@/components/community/CommunityLikeButton";

export default async function CommunityPost({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedCommunityPost(id);
  if (!post) {
    return notFound();
  }
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className="p-5 text-white border-b-slate-200 border-b">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <CommunityLikeButton
          postId={id}
          isLiked={isLiked}
          likeCount={likeCount}
        />
      </div>
    </div>
  );
}
