import { getCachedUser } from "@/actions/profile";
import { updateProfile } from "@/actions/profile/edit";
import ProfileForm from "@/components/profile/ProfileForm";
import getSession from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "내 정보 수정",
};

export default async function ProfileEdit() {
  const session = await getSession();
  const myInfo = await getCachedUser(session.id);
  if (!myInfo) {
    return notFound();
  }

  return (
    <ProfileForm action={updateProfile} initialState={myInfo} id={session.id} />
  );
}
