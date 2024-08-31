import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, Trash2Icon, EllipsisVerticalIcon } from "lucide-react";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "@/components/common/SubmitButton";
import { deleteCommunityPost } from "@/actions/community/[id]";
interface IUserInfoProps {
  userId: number;
  postId: number;
  sessionId: number;
  avatar: string;
  username: string;
  createdAt: Date;
}

export default function UserInfo({
  userId,
  avatar,
  postId,
  sessionId,
  username,
  createdAt,
}: IUserInfoProps) {
  const handleDeleteCommunityPost = async () => {
    "use server";
    await deleteCommunityPost(postId);
  };
  return (
    <div className="flex justify-between">
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
      {sessionId === userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="none" size="icon">
              <EllipsisVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/community/${postId}/edit`}>
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                <span>수정</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              <form action={handleDeleteCommunityPost}>
                <SubmitButton variant="none" className="px-0 py-0 h-5">
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>삭제</span>
                </SubmitButton>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
