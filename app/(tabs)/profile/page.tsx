import { getUser, logOut } from "@/actions/profile";
import SubmitButton from "@/components/common/SubmitButton";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import getSession from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringItem from "@/components/gatherings/GatheringItem";
import CommunityItem from "@/components/community/CommunityItem";

export default async function Profile() {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }
  const myInfo = await getUser(session.id);
  const handleLogOut = async () => {
    "use server";
    await logOut();
  };
  return (
    <>
      <Link
        href={"/profile/edit"}
        className="flex w-full items-center justify-start gap-2 px-side py-5 pt-4 text-left text-gray-800"
      >
        <Image
          className="h-8 w-8 overflow-hidden object-cover rounded-full"
          src={myInfo.avatar!}
          alt="프로필 이미지"
          width={32}
          height={32}
          sizes="32px"
        />
        <div className="flex flex-1 flex-col items-start">
          <span className="text-base font-bold text-gray-900">
            {myInfo.username}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {myInfo.email}
          </span>
        </div>
        <ChevronRightIcon className="size-5" />
      </Link>
      <Tabs defaultValue="gatherings" className="w-full px-side pb-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gatherings">
            만든 모임 ({myInfo.gatheringPost?.length})
          </TabsTrigger>
          <TabsTrigger value="community">
            커뮤니티 글 ({myInfo.communityPost?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gatherings">
          {myInfo.gatheringPost.map((post) => (
            <GatheringItem key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="community">
          {myInfo.communityPost.map((post) => (
            <CommunityItem key={post.id} {...post} />
          ))}
        </TabsContent>
      </Tabs>
      <form action={handleLogOut}>
        <SubmitButton variant="link">로그아웃</SubmitButton>
      </form>
    </>
  );
}
