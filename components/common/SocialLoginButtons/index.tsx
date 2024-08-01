import SocialButton from "./SocialButton";

export interface ISocialLoginButtons {
  href: string;
  css: string;
  iconSrc: string;
  alt: string;
  text: string;
}

const socialLoginButtonsData: ISocialLoginButtons[] = [
  {
    href: "/github/start",
    iconSrc: "/assets/icons/github.svg",
    css: "bg-gray-600 hover:bg-gray-700 text-white",
    alt: "github logo",
    text: "깃허브 로그인",
  },
  {
    href: "/google/start",
    iconSrc: "/assets/icons/google.svg",
    css: "bg-slate-50 hover:bg-slate-200 text-black",
    alt: "google logo",
    text: "구글 로그인",
  },
];

export default function SocialLoginButtons() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        {socialLoginButtonsData.map((button) => (
          <SocialButton
            key={button.href}
            href={button.href}
            css={button.css}
            iconSrc={button.iconSrc}
            alt={button.alt}
            text={button.text}
          />
        ))}
      </div>
    </>
  );
}
