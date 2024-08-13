import { getUser, logOut } from "@/actions/profile";
import SubmitButton from "@/components/common/SubmitButton";
export default async function Profile() {
  const user = await getUser();
  const handleLogOut = async () => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 20000));
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
