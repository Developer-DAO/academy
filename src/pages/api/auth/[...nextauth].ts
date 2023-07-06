// Imports
// ========================================================
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { authOptions } from "@/server/auth";

// Auth
// ========================================================
const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  const authOpts: NextAuthOptions = authOptions({ req });

  const isDefaultSigninPage =
    req.method === "GET" && req?.query?.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    // Removes from the authOptions.providers array
    authOpts.providers.pop();
  }

  return NextAuth(req, res, authOpts) as typeof NextAuth;
};

// Exports
// ========================================================
export default Auth;
