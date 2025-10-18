import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./lib/session";

const PUBLIC_ROUTES = ["/", "/signup", "/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !PUBLIC_ROUTES.includes(path);
  const token = (await cookies()).get("session")?.value || "";
  const session = await decryptToken(token);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!isProtectedRoute && session?.userId) {
    return NextResponse.redirect(new URL("/app", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
