import { getCommunityPosts } from "@/actions/community";
import FloatingAddButton from "@/components/common/FloatingAddButton";
import CommunityItem from "@/components/community/CommunityItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티",
};

export const revalidate = 0;

export default async function Community() {
  const posts = await getCommunityPosts();

  return (
    <div className="px-side">
      {posts?.map((post) => (
        <CommunityItem key={post.id} {...post} />
      ))}
      <FloatingAddButton href="/community/add" />
    </div>
  );
}
