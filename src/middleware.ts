import { NextRequest, NextResponse } from "next/server";
import { getLoginDataFromCookies } from "./infrastructure/sessions/savedata.cookies";
import { ROLES, ROLE_PATHS, isValidRole, UserRole } from "./config/roles";

const protectedRoutes = ["/dashboard", "/profile","/buyer", "/farmer", "/admin"];
const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];

// Define role-based routes with proper typing
const roleBasedRoutes: {
  path: string;
  roles: UserRole[];
}[] = [
  { path: "/farmer", roles: [ROLES.FARMER] },
  { path: "/buyer", roles: [ROLES.BUYER] },
  { path: "/admin", roles: [ROLES.ADMIN] }
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => {
    if (route === "/") return path === "/";
    return path.startsWith(route);
  });

  const cookie = await getLoginDataFromCookies();
  const role = cookie?.user?.profileType as UserRole | undefined;

  // 🔒 User not authenticated but trying to access a protected route
  // if (isProtectedRoute && !cookie) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  // }
   
  // // 🔄 User authenticated but trying to access public routes
  // if (isPublicRoute && cookie) {
  //   if (path !== "/dashboard") {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  // }

  // // Handle role-specific authorization
  // if (cookie && role) {
  //   // Redirect from profile to dashboard
  //   if (path === "/profile") {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }

  //   // Validate user role
  //   if (!isValidRole(role)) {
  //     return NextResponse.redirect(new URL("/unauthorized", req.url));
  //   }

  //   // Handle root dashboard redirection
  //   if (path === "/dashboard") {
  //     return NextResponse.redirect(new URL(ROLE_PATHS[role], req.url));
  //   }

  //   // Check role-based routes with proper type assertion
  //   for (const route of roleBasedRoutes) {
  //     if (path.startsWith(route.path)) {
  //       if (!(route.roles as UserRole[]).includes(role)) {
  //         return NextResponse.redirect(new URL("/unauthorized", req.url));
  //       }
  //       break;
  //     }
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/:path*",
    "/farmer/:path*",
    "/buyer/:path*",
    "/admin/:path*"
  ],
};