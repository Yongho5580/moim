import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
      <h2 className="text-2xl font-bold">앗! 죄송해요</h2>
      <p className="mb-2">원하시는 페이지를 찾을 수 없어요.</p>
      <Button asChild>
        <Link href="/">홈으로 이동</Link>
      </Button>
    </div>
  );
}
