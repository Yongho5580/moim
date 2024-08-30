import {
  getCachedGatheringPost,
  getGathering,
  getIsOwner,
} from "@/actions/gatherings";
import { formatToWon, isPastEndDate } from "@/lib/utils";
import { ChatBubbleLeftRightIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createChatRoom } from "@/actions/chats";
import { SubmitButton } from "@/components/common/SubmitButton";
import getSession from "@/lib/session";
import { createParticipant } from "@/actions/gatherings/[id]";
import Countdown from "@/components/gatherings/CountDown";

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
  const gathering = await getGathering(id);
  if (!gathering) {
    return notFound();
  }
  const session = await getSession();
  const isOwner = await getIsOwner(gathering.userId, session.id);

  const disabledButtonValue = () => {
    if (
      isPastEndDate(gathering.endDate) ||
      gathering.status === "closed" ||
      gathering.maxParticipants === gathering.participants.length
    ) {
      return true;
    }
    return false;
  };

  const startChat = async () => {
    "use server";
    await createChatRoom(gathering.userId, session.id);
  };

  const handleCreateParticipant = async () => {
    "use server";
    await createParticipant(session.id, gathering.id);
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
      <div className="p-5 flex flex-col sm:flex-row items-center justify-between border-b gap-2 border-gray-300">
        <Link href={`/user/${gathering.userId}`}>
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
        </Link>
        <div className="flex">
          {!isOwner ? (
            <div className="flex gap-4">
              <form action={handleCreateParticipant}>
                <SubmitButton
                  disabled={disabledButtonValue()}
                  variant={disabledButtonValue() ? "secondary" : "default"}
                >
                  모임 신청
                </SubmitButton>
              </form>
              <form action={startChat}>
                <SubmitButton>
                  <ChatBubbleLeftRightIcon className="h-[25px]" />
                </SubmitButton>
              </form>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="h-full flex flex-col p-5 gap-0.5 overflow-y-auto max-h-[200px] scrollbar-hide">
        <h1 className="text-xl font-medium">{gathering.title}</h1>
        <div className="flex gap-1">
          <div className="flex items-center gap-1 *:text-neutral-500">
            <span className="text-xs">{gathering.location}</span>
            <span>·</span>
            <span className="text-xs">
              {gathering.participants.length}/{gathering.maxParticipants} 모집
            </span>
            <span>·</span>
          </div>
          <Countdown
            variant="secondary"
            status={gathering.status}
            endDate={gathering.endDate}
          />
        </div>
        <span className="text-lg font-bold">
          {formatToWon(gathering.price)}원
        </span>
        <p className="mt-4 text-neutral-900 text-sm">{gathering.description}</p>
      </div>
    </div>
  );
}
