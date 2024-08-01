import SocialButton from "./social-button";

const socialLoginButtonsData = [
  {
    href: "/github/start",
    bgColor: "bg-gray-600",
    hoverColor: "bg-gray-700",
    textColor: "text-white",
    iconSrc: "/assets/icons/github.svg",
    alt: "github logo",
    text: "깃허브 로그인",
  },
  {
    href: "/kakao/start",
    bgColor: "bg-[#FEE500]",
    hoverColor: "bg-[#b7a714]",
    textColor: "text-black",
    iconSrc: "/assets/icons/kakao.svg",
    alt: "kakao logo",
    text: "카카오 로그인",
  },
  {
    href: "/google/start",
    bgColor: "bg-slate-50",
    hoverColor: "bg-slate-200",
    textColor: "text-black",
    iconSrc: "/assets/icons/google.svg",
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
            bgColor={button.bgColor}
            hoverColor={button.hoverColor}
            textColor={button.textColor}
            iconSrc={button.iconSrc}
            alt={button.alt}
            text={button.text}
          />
        ))}
      </div>
    </>
  );
}
