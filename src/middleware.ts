import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionFromCookie, COOKIE_NAME } from "@/lib/middleware-auth";

const protectedPaths = ["/dashboard", "/tracking", "/exercises", "/progress"];
const authPaths = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySessionFromCookie(token);

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuth = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuth && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tracking/:path*",
    "/exercises/:path*",
    "/progress/:path*",
    "/login",
    "/register",
  ],
};
