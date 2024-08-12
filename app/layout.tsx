import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 모임",
    default: "모임",
  },
  description: "함께하면 즐거움이 배가 되는 모임!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
