import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainContainer from "@/components/common/MainContainer";
import MainContent from "@/components/common/MainContent";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 모임 | moim",
    default: "모임 | moim",
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
        className={cn("overflow-auto", pretendard.variable, "font-pretendard")}
      >
        <MainContainer>
          <MainContent>{children}</MainContent>
        </MainContainer>
      </body>
    </html>
  );
}
