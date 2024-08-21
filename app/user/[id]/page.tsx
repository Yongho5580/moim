import { getUser } from "@/actions/profile";
import CommunityItem from "@/components/community/CommunityItem";
import GatheringItem from "@/components/gatherings/GatheringItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getSession from "@/lib/session";
import Image from "next/image";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(Number(params.id));
  const session = await getSession();
  return (
    <div className="flex flex-col items-center gap-5 py-5">
      <Image
        src={user.avatar!}
        alt={user.username}
        width={128}
        height={128}
        className="rounded-full w-32 h-32 object-cover"
      />
      <span className="text-lg font-semibold ">{user.username}</span>
      <Tabs defaultValue="gatherings" className="w-full px-side pb-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gatherings">
            참가한 모임 ({user.gatheringPost?.length})
          </TabsTrigger>
          <TabsTrigger value="community">
            커뮤니티 글 ({user.communityPost?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gatherings">
          {user.gatheringPost.length !== 0 ? (
            user.gatheringPost.map((post) => (
              <GatheringItem
                key={post.id}
                isOwner={post.userId === session.id}
                {...post}
              />
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
          {user.communityPost.length !== 0 ? (
            user.communityPost.map((post) => (
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
    </div>
  );
}
