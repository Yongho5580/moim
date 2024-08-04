import { getUser, logOut } from "@/actions/profile";
import { Suspense } from "react";
export default async function Profile() {
  const user = await getUser();
  const handleLogOut = async () => {
    "use server";
    await logOut();
  };
  return (
    <div>
      <h1>안녕! {user.username}</h1>
      <form action={handleLogOut}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
