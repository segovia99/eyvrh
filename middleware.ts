import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    pages: {
      signIn: "/login",
      // error: "/error",
    },
  }
  // {
  //   callbacks: {
  //     authorized: ({ token }) => token?.role === "admin",
  //   },
  // },
);

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
