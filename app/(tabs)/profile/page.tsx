import { getUser, logOut } from "@/actions/profile";
import { Suspense } from "react";

async function Username() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <h1>welcome 용호 ㅋㅋ</h1>;
}

export default async function Profile() {
  const user = await getUser();
  const handleLogOut = async () => {
    "use server";
    await logOut();
  };
  return (
    <div>
      <Suspense fallback={"welcome 하윙 ㅋㅋ"}>
        <Username />
      </Suspense>
      <form action={handleLogOut}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
