import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <Image
              src="/assets/icons/github.svg"
              width={20}
              height={20}
              alt="github logo"
            />
          </span>
          <span>Github 로그인</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>SMS 로그인</span>
        </Link>
      </div>
    </>
  );
}
