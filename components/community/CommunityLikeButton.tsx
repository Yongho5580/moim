"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { disLikeCommunityPost, likeCommunityPost } from "@/actions/community";

interface ICommunityLikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function CommunityLikeButton({
  isLiked,
  likeCount,
  postId,
}: ICommunityLikeButtonProps) {
  const [optimisticState, updateFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    updateFn(undefined);
    if (isLiked) {
      await disLikeCommunityPost(postId);
    } else {
      await likeCommunityPost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors ${
        optimisticState.isLiked
          ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-400"
          : ""
      }`}
    >
      {optimisticState.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {optimisticState.isLiked ? (
        <span>{optimisticState.likeCount}</span>
      ) : (
        <span>공감하기 ({optimisticState.likeCount})</span>
      )}
    </button>
  );
}
