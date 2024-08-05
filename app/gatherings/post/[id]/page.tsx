import { getGathering, getIsOwner } from "@/actions/gatherings";
import { db } from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import Button from "@/components/common/Button";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const gathering = await getGathering(+params.id);
  return {
    title: gathering?.title,
  };
}

const getCachedGathering = unstable_cache(getGathering, ["gathering-post"], {
  tags: ["gathering-post"],
});

export default async function GatheringPost({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const gathering = await getCachedGathering(id);
  if (!gathering) {
    return notFound();
  }
  const isOwner = await getIsOwner(gathering.userId);

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
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
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
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{gathering.title}</h1>
        <p>{gathering.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg">
          {formatToWon(gathering.price)}원
        </span>
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
    </div>
  );
}
