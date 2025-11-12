import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/staff/:path*"],
};

export default function proxy(request: NextRequest) {
  const cookie = request.cookies.get("swl_staff");

  if (!cookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/gate";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
