// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organization(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  console.log(
    "middleware -------> auth userId ===>",
    userId,
  );
  console.log("path ----------->", req.nextUrl.pathname);

  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  if (
    userId &&
    req.nextUrl.pathname !== "/onboarding" &&
    req.nextUrl.pathname !== "/" &&
    !isProtectedRoute(req)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // all app routes, no static files
    "/(api|trpc)(.*)", // all API routes
  ],
};
