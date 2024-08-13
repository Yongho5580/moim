import Image from "next/image";
import Link from "next/link";
import { ISocialLoginButtons } from "..";
import { Button } from "@/components/ui/button";

export default function SocialButton({
  href,
  css,
  iconSrc,
  alt,
  text,
}: ISocialLoginButtons) {
  return (
    <Button
      asChild
      className={`${css} flex h-10 items-center justify-center gap-3`}
    >
      <Link href={href}>
        <span>
          <Image src={iconSrc} width={20} height={20} alt={alt} />
        </span>
        <span>{text}</span>
      </Link>
    </Button>
  );
}
