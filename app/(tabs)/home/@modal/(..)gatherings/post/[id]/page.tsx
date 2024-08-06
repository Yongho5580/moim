import {
  getCachedGatheringPost,
  getGathering,
  getIsOwner,
} from "@/actions/gatherings";
import GatheringModalContainer from "@/components/gatherings/GatheringModalContainer";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const gathering = await getGathering(+params.id);
  return {
    title: gathering?.title,
  };
}

export default async function GatheringModal({
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
  const isOwner = await getIsOwner(gathering.userId);

  return (
    <GatheringModalContainer>
      <div className="aspect-square h-full w-full">
        <div className="bg-neutral-900 text-neutral-200 relative flex justify-center rounded-t-xl items-center overflow-hidden h-full">
          <Image
            src={gathering.photo}
            alt={gathering.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-contain overflow-hidden"
          />
        </div>
      </div>
      <div className="p-5 flex items-center justify-between border-b border-neutral-700">
        <div className="flex items-center gap-3">
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
        <div className="flex">
          {isOwner ? (
            <Link
              className="bg-emerald-500 px-5 py-2.5 rounded-md font-semibold text-white"
              href={`/gatherings/post/${id}/edit`}
            >
              <PencilSquareIcon className="h-[25px]" />
            </Link>
          ) : (
            <Link
              className="bg-emerald-500 px-5 py-2.5 rounded-md font-semibold text-white"
              href="/chats"
            >
              <ChatBubbleLeftRightIcon className="h-[25px]" />
            </Link>
          )}
        </div>
      </div>
      <div className="h-full flex flex-col p-5 gap-1 overflow-y-auto max-h-[200px] scrollbar-hide">
        <h1 className="text-xl font-medium">{gathering.title}</h1>
        <span className="text-sm text-neutral-500">{gathering.location}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(gathering.created_at.toString())}
        </span>
        <span className="text-lg font-bold">
          {formatToWon(gathering.price)}원
        </span>
        <p className="mt-4 font-light text-neutral-200 text-sm">
          {gathering.description}
        </p>
      </div>
    </GatheringModalContainer>
  );
}
