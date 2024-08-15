import { getCachedUser } from "@/actions/profile";
import { updateProfile } from "@/actions/profile/edit";
import ProfileForm from "@/components/profile/ProfileForm";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export default async function ProfileEdit() {
  const session = await getSession();
  const myInfo = await getCachedUser(session.id);
  if (!myInfo) {
    return notFound();
  }

  return <ProfileForm action={updateProfile} initialState={myInfo} />;
}
