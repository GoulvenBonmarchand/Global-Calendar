export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/calendar/:path*", "/parameters/:path*"],
};
