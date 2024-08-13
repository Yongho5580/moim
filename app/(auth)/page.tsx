import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center *:font-medium">
        <span className="text-9xl">👯</span>
        <h1 className="text-4xl">모임</h1>
        <h1 className="text-2xl">연결되는 즐거움을 느껴보세요!</h1>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Button asChild className="w-full">
          <Link href="/create-account">시작하기</Link>
        </Button>
        <div className="flex items-center gap-2">
          <span>이미 계정이 있나요?</span>
          <Button variant="link" asChild>
            <Link href="/login">로그인</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
