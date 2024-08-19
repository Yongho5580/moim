"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { startTransition, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import {
  disLikeCommunityPost,
  likeCommunityPost,
} from "@/actions/community/[id]";

interface ILikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: ILikeButtonProps) {
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
    startTransition(() => updateFn(undefined));
    if (isLiked) {
      await disLikeCommunityPost(postId);
    } else {
      await likeCommunityPost(postId);
    }
  };
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-300 hover:bg-neutral-200 hover:text-white rounded-full  transition-colors ${
        optimisticState.isLiked
          ? "text-primary border-primary hover:bg-primary-hover"
          : ""
      }`}
    >
      <HeartIcon
        className={`size-4 ${optimisticState.isLiked ? "fill-primary" : ""}`}
      />
      <span>{optimisticState.likeCount}</span>
    </Button>
  );
}
