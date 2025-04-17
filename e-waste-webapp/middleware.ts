import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/marketplace",
    "/education",
    "/donate",
  ].includes(path)

  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value

  // Get the user role from cookies (in a real app, this would be verified with JWT)
  const role = request.cookies.get("user-role")?.value || "user"

  // Redirect logic for authentication
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect logic for role-based access
  if (token) {
    // Admin routes protection
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Organization routes protection
    if (path.startsWith("/organization") && role !== "organization" && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect authenticated users away from login/register
    if (isPublicPath && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/admin/:path*",
    "/organization/:path*",
    "/rewards/:path*",
  ],
}
