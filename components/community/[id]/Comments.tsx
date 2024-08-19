"use client";

import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useFormState } from "react-dom";
import { uploadComment } from "@/actions/community";
import { useOptimistic } from "react";

type Comment = {
  id: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  payload: string;
};

interface ICommentsProps {
  postId: number;
  sessionId: number;
  comments: Comment[];
}

export default function Comments({
  postId,
  comments,
  sessionId,
}: ICommentsProps) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (currentState, newComment: Comment) => [...currentState, newComment]
  );
  const interceptAction = async (_: any, formData: FormData) => {
    const optimisticComment = {
      payload: formData.get("comment")?.toString()!,
      id: Date.now(),
      communityPostId: postId,
      created_at: new Date(),
      user: {
        id: Date.now(),
        username: "optimistic",
        avatar: null,
      },
    };
    addOptimistic(optimisticComment);
    formData.append("postId", String(postId));
    return uploadComment(_, formData);
  };
  const [state, formAction] = useFormState(interceptAction, null);

  return (
    <div className="py-5 flex flex-col gap-5">
      <CommentForm postId={postId} formAction={formAction} />
      {optimisticComments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          userId={comment.user.id}
          sessionId={sessionId}
          avatar={comment.user.avatar!}
          username={comment.user.username}
          createdAt={comment.created_at}
          payload={comment.payload}
        />
      ))}
    </div>
  );
}
