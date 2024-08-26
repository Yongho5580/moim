import { uploadCommunity } from "@/actions/community/add";
import CommunityForm from "@/components/community/CommunityForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 생성",
};

export default function AddCommunity() {
  return <CommunityForm action={uploadCommunity} />;
}
