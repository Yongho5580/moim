import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { PUBLIC_ONLY_URLS } from "./constants/urls";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = PUBLIC_ONLY_URLS[request.nextUrl.pathname];
  // 로그인하지 않은 상태이면서, PUBLIC ONLY URL이 아닌 곳에 접근하려 할 때
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // 로그인한 상태이면서, PUBLIC ONLY URL인 곳에 접근하려 할 때
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    if (exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|icon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
