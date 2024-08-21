import {
  getCachedGatheringPost,
  getGathering,
  getIsOwner,
} from "@/actions/gatherings";
import { formatToWon } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createChatRoom } from "@/actions/chats";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/common/SubmitButton";
import getSession from "@/lib/session";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const gathering = await getGathering(+params.id);
  return {
    title: gathering?.title,
  };
}
export default async function GatheringPost({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const gathering = await getCachedGatheringPost(id);
  if (!gathering) {
    return notFound();
  }
  const session = await getSession();
  const isOwner = await getIsOwner(gathering.userId, session.id);

  const interceptAction = async () => {
    "use server";
    await createChatRoom(gathering.userId);
  };

  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          priority
          sizes="400px"
          src={gathering.photo}
          alt={gathering.title}
          className="object-cover"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-gray-300">
        <div className="size-10 overflow-hidden rounded-full">
          {gathering.user.avatar !== null ? (
            <Image
              src={gathering.user.avatar}
              alt={gathering.user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserIcon className="size-10 rounded-full" />
          )}
        </div>
        <div>
          <h3>{gathering.user.username}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{gathering.title}</h2>
        <p>{gathering.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg">
          {formatToWon(gathering.price)}원
        </span>
        <div className="flex">
          {isOwner ? (
            <Button asChild>
              <Link href={`/gatherings/post/${id}/edit`}>
                <PencilSquareIcon className="h-[25px]" />
              </Link>
            </Button>
          ) : (
            <div className="flex gap-4">
              <form action={interceptAction}>
                <SubmitButton>
                  <ChatBubbleLeftRightIcon className="h-[25px]" />
                </SubmitButton>
              </form>
              <form action={interceptAction}>
                <SubmitButton>
                  <ChatBubbleLeftRightIcon className="h-[25px]" />
                </SubmitButton>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
