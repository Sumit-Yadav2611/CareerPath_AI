import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Tolerate clock skews between local machine and Clerk auth servers (up to 60s)
  clockSkewInMs: 60000,
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|ico|webp|avif|woff2?|ttf|otf|eot|pdf|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};