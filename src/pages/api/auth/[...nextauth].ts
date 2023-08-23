// Imports
// ========================================================
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { type NextAuthOptions } from "next-auth";
import { authOptions } from "@/server/auth";

// Auth
// ========================================================
const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const authOpts: NextAuthOptions = authOptions({ req });

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    // Removes from the authOptions.providers array
    authOpts.providers.pop();
  }

  return (await NextAuth(req, res, authOpts)) as typeof NextAuth;
};

// Exports
// ========================================================
export default Auth;
