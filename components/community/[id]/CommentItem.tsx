import { deleteComment } from "@/actions/community";
import { SubmitButton } from "@/components/common/SubmitButton";
import { formatToTimeAgo } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ICommentItemProps {
  id: number;
  sessionId: number;
  userId: number;
  avatar: string;
  username: string;
  createdAt: Date;
  payload: string;
}

export default function CommentItem({
  id,
  sessionId,
  userId,
  avatar,
  username,
  createdAt,
  payload,
}: ICommentItemProps) {
  const handleDeleteComment = async () => {
    await deleteComment(id);
  };
  return (
    <div className="flex justify-between" key={id}>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={28}
            height={28}
            className="size-7 rounded-full"
            src={avatar ?? "/assets/images/no_user.png"}
            alt={username}
          />
          <div>
            <span className="text-sm font-semibold">{username}</span>
            <div className="text-xs">
              <span>{formatToTimeAgo(createdAt.toString())}</span>
            </div>
          </div>
        </div>
        <div>{payload}</div>
      </div>
      {sessionId === userId ? (
        <form action={handleDeleteComment}>
          <SubmitButton variant="none">
            <TrashIcon className="size-5" />
          </SubmitButton>
        </form>
      ) : null}
    </div>
  );
}
