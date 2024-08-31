import { createChatRoom } from "@/actions/chats";
import { getCachedGatheringPost, getIsOwner } from "@/actions/gatherings/[id]";
import { createParticipant } from "@/actions/gatherings/[id]";
import { SubmitButton } from "@/components/common/SubmitButton";
import Countdown from "@/components/gatherings/CountDown";
import GatheringModalContainer from "@/components/gatherings/GatheringModalContainer";
import getSession from "@/lib/session";
import { formatToWon, isPastEndDate } from "@/lib/utils";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import UserIcon from "@/public/assets/images/profile-user.png";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const gathering = await getCachedGatheringPost(+params.id);
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
  const session = await getSession();
  const isOwner = await getIsOwner(gathering.userId, session.id);
  const isParticipant = gathering.participants.find(
    (participant) => participant.userId === session.id
  );

  const disabledButtonValue = () => {
    if (
      isPastEndDate(gathering.endDate) ||
      isParticipant ||
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
    <GatheringModalContainer>
      <div className="h-full max-h-[600px] w-full">
        <div className="text-neutral-200 relative flex justify-center rounded-t-xl items-center overflow-hidden h-full">
          <Image
            fill
            priority
            sizes="400px"
            src={gathering.photo}
            alt={gathering.title}
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-5 flex flex-col sm:flex-row items-center justify-between border-b gap-2 border-gray-300">
        <Link href={`/user/${gathering.userId}`}>
          <div className="flex items-center gap-3">
            <div className="size-10 overflow-hidden rounded-full">
              <Image
                src={gathering.user.avatar || UserIcon}
                alt={gathering.user.username}
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3 className="font-semibold">{gathering.user.username}</h3>
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
                  {isParticipant ? "참가 완료" : "모임 참가"}
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
      <div className="h-full flex flex-col p-5 gap-0.5 overflow-y-auto max-h-[300px] scrollbar-hide">
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
        <p className="mt-4 text-neutral-900 text-sm mb-5">
          {gathering.description}
        </p>
        <div className="py-5 rounded-md">
          <div className="text-lg font-semibold">
            모임 멤버 ({gathering.participants.length})
          </div>
          <div className="flex flex-col">
            {gathering.participants.map((participant) => (
              <Link
                href={`/user/${participant.userId}`}
                key={participant.userId}
                className="flex items-center gap-2 w-full border-b border-gray-300 last:border-b-0 py-4"
              >
                <Image
                  className="h-8 w-8 overflow-hidden object-cover rounded-full"
                  src={participant.user.avatar || UserIcon}
                  alt={participant.user.username}
                  width={40}
                  height={40}
                />
                <div className="text-sm font-bold">
                  {participant.user.username}
                  {gathering.userId === participant.userId && (
                    <span className="pl-2">👑</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </GatheringModalContainer>
  );
}
