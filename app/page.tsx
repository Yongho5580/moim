import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center *:font-medium">
        <span className="text-9xl">👥</span>
        <h1 className="text-4xl">모임</h1>
        <h1 className="text-2xl">연결되는 즐거움을 느껴보세요!</h1>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          className="w-full bg-emerald-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-emerald-600 transition-colors"
          href="/create-account"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link className="hover:underline" href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
