import { NextResponse, type NextRequest } from "next/server";

// Front-desk pages sit behind a single shared password (ADMIN_PASSWORD).
export function middleware(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Set ADMIN_PASSWORD to enable the front-desk view.", { status: 503 });
  }
  const [scheme, encoded] = (req.headers.get("authorization") ?? "").split(" ");
  if (scheme === "Basic" && encoded) {
    const [, pass] = atob(encoded).split(":");
    if (pass === password) return NextResponse.next();
  }
  return new NextResponse("Login required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="FVPT front desk"' },
  });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
