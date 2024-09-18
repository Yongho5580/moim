import { getUser, logOut } from "@/actions/profile";
import { SubmitButton } from "@/components/common/SubmitButton";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import getSession from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringItem from "@/components/gatherings/GatheringItem";
import CommunityItem from "@/components/community/CommunityItem";
import UserIcon from "@/public/assets/images/profile-user.png";
import { blurDataURL } from "@/constants/blurDataURL";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
};

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
  const handleRedirect = async () => {
    "use server";
    redirect("/profile/edit/password");
  };

  return (
    <>
      <Link
        href={"/profile/edit"}
        className="flex w-full items-center justify-start gap-2 px-side py-5 pt-4 text-left text-gray-800"
      >
        <Image
          className="h-8 w-8 overflow-hidden object-cover rounded-full"
          src={myInfo.avatar || UserIcon}
          quality={75}
          alt="프로필 이미지"
          width={32}
          height={32}
          blurDataURL={blurDataURL}
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
            참가한 모임 ({myInfo.gatheringPost?.length})
          </TabsTrigger>
          <TabsTrigger value="community">
            커뮤니티 글 ({myInfo.communityPost?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gatherings" className="flex flex-col gap-4">
          {myInfo.gatheringPost.length !== 0 ? (
            myInfo.gatheringPost.map((post) => (
              <div key={post.id}>
                <GatheringItem
                  isOwner={post.userId === session.id}
                  key={post.id}
                  {...post}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center align-center w-full py-16 bg-gray-100">
              <span className="text-sm font-medium text-gray-400">
                참가한 모임이 없어요
              </span>
            </div>
          )}
        </TabsContent>
        <TabsContent value="community">
          {myInfo.communityPost.length !== 0 ? (
            myInfo.communityPost.map((post) => (
              <CommunityItem key={post.id} {...post} />
            ))
          ) : (
            <div className="flex justify-center align-center w-full py-16 bg-gray-100">
              <span className="text-sm font-medium text-gray-400">
                작성한 커뮤니티 글이 없어요
              </span>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <div className="px-side pb-5">
        {myInfo.auth_type === "email" && (
          <form action={handleRedirect}>
            <SubmitButton variant="link" className="p-0">
              비밀번호 변경
            </SubmitButton>
          </form>
        )}
        <form action={handleLogOut}>
          <SubmitButton variant="link" className="p-0">
            로그아웃
          </SubmitButton>
        </form>
      </div>
    </>
  );
}
