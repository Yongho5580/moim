import Image from "next/image";
import Link from "next/link";
import { ISocialLoginButtons } from "..";

export default function SocialButton({
  href,
  css,
  iconSrc,
  alt,
  text,
}: ISocialLoginButtons) {
  return (
    <Link
      className={`${css} primary-btn flex h-10 items-center justify-center gap-3`}
      href={href}
    >
      <span>
        <Image src={iconSrc} width={20} height={20} alt={alt} />
      </span>
      <span>{text}</span>
    </Link>
  );
}
