import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedApi = createRouteMatcher([
  "/api/workflow(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Protect API route
  if (isProtectedApi(req) && !userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
