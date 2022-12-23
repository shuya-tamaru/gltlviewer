import { NextRequest, NextResponse } from "next/server";
import { buildingList } from "./utils/paths";

export const config = {
  matcher: ["/", "/building/:path*"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");
    const buildingName = url.pathname.replace("/building/", "");
    const matchList = buildingList.filter((obj) => {
      if (obj.id === buildingName) return obj;
    });

    if (matchList.length > 0) {
      if (user === matchList[0].user && pwd === matchList[0].password) {
        return NextResponse.next();
      }
    } else {
      if (user === `${process.env.NEXT_PUBLIC_LOCAL_ADMIN_UER}` && pwd === `${process.env.NEXT_PUBLIC_LOCAL_ADMIN_PASSWORD}`) {
        return NextResponse.next();
      }
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
