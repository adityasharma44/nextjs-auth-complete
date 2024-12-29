import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/user/login" || path === "/user/signup";
  const baseUrl = request.nextUrl.origin;
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(`${baseUrl}/`);
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(`${baseUrl}/user/login`);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:Id", "/user/login", "/user/signup"],
};
