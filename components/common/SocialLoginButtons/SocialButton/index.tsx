import Image from "next/image";
import Link from "next/link";

interface ISocialButtonProps {
  href: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
  iconSrc: string;
  alt: string;
  text: string;
}

export default function SocialButton({
  href,
  bgColor,
  hoverColor,
  textColor,
  iconSrc,
  alt,
  text,
}: ISocialButtonProps) {
  return (
    <Link
      className={`primary-btn flex h-10 items-center justify-center gap-3 ${bgColor} hover:${hoverColor} ${textColor}`}
      href={href}
    >
      <span>
        <Image src={iconSrc} width={20} height={20} alt={alt} />
      </span>
      <span>{text}</span>
    </Link>
  );
}
