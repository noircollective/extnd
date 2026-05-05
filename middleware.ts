import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirect every public request to /coming-soon.
 * Static assets, Next.js internals, and /coming-soon itself are excluded.
 */
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  // Match all routes EXCEPT: /coming-soon, static files, Next internals, and favicon
  matcher: [
    "/((?!coming-soon|_next|api|favicon\\.ico|.*\\..*).*)",
  ],
};
