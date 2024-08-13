import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans_KR({
  weight: "500",
  subsets: ["latin"],
  variable: "--noto-sans",
});

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
        className={cn(
          "bg-background max-w-screen-sm mx-auto py-5",
          notoSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
