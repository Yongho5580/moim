import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        {/* make components below <Link>... */}
        <Link
          className="primary-btn bg-gray-600 hover:bg-gray-700 flex h-10 items-center justify-center gap-3"
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
          <span>깃허브 로그인</span>
        </Link>
        <Link
          className="primary-btn bg-[#FEE500] hover:bg-[#b7a714] text-black flex h-10 items-center justify-center gap-3"
          href="/kakao/start"
        >
          <span>
            <Image
              src="/assets/icons/kakao.svg"
              width={20}
              height={20}
              alt="kakao logo"
            />
          </span>
          <span>카카오 로그인</span>
        </Link>
        <Link
          className="primary-btn bg-slate-50 hover:bg-slate-200 text-black flex h-10 items-center justify-center gap-3"
          href="/google/start"
        >
          <span>
            <Image
              src="/assets/icons/google.svg"
              width={20}
              height={20}
              alt="google logo"
            />
          </span>
          <span>구글 로그인</span>
        </Link>
        <Link
          className="primary-btn bg-zinc-400 hover:bg-zinc-500 flex h-10 items-center justify-center gap-3"
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
