import { getUser, logOut } from "@/actions/profile";
import SubmitButton from "@/components/common/SubmitButton";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
export default async function Profile() {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }
  const user = await getUser(session.id);
  const handleLogOut = async () => {
    "use server";
    await logOut();
  };
  return (
    <div>
      <h1>안녕! {user.username}</h1>
      <form action={handleLogOut}>
        <SubmitButton>로그아웃</SubmitButton>
      </form>
    </div>
  );
}
