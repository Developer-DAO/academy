// Imports
// ========================================================
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { prisma } from "@/server/db";
// SIWE Integration
import type { CtxOrReq } from "next-auth/client/_utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import type { Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";

// Types
// ========================================================
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// Auth Options
// ========================================================
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: (ctxReq: CtxOrReq) => NextAuthOptions = ({
  req,
}) => ({
  callbacks: {
    // token.sub will refer to the id of the wallet address
    // session: ({ session, token }) =>
    //   ({
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.sub,
    //     },
    //   } as Session & { user: { id: string } }),
    session: ({ session, user }) =>
      ({
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      } as Session & { user: { id: string } }),
    // OTHER CALLBACKS to take advantage of but not needed
    // signIn: async (params: { // Used to control if a user is allowed to sign in
    //   user: User | AdapterUser
    //   account: Account | null
    //   // Not used for credentials
    //   profile?: Profile
    //   // Not user
    //   email?: {
    //   }
    //   /** If Credentials provider is used, it contains the user credentials */
    //   credentials?: Record<string, CredentialInput>
    // }) => { return true; },
    // redirect: async (params: { // Used for a callback url but not used with credentials
    //   /** URL provided as callback URL by the client */
    //   url: string
    //   /** Default base URL of site (can be used as fallback) */
    //   baseUrl: string
    // }) => {
    //    return params.baseUrl;
    // },
    // jwt: async ( // Callback whenever JWT created (i.e. at sign in)
    //   params: {
    //     token: JWT
    //     user: User | AdapterUser
    //     account: Account | null
    //     profile?: Profile
    //     trigger?: "signIn" | "signUp" | "update"
    //     /** @deprecated use `trigger === "signUp"` instead */
    //     isNewUser?: boolean
    //     session?: any
    //   }
    // ) => {
    //   return params.token;
    // }
  },
  // OTHER OPTIONS (not needed)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // in case you want pass this along for other functionality
  adapter: PrismaAdapter(prisma), // Not meant for type 'credentials' (used for db sessions)
  // jwt: { // Custom functionlaity for jwt encoding/decoding
  //   encode: async ({ token, secret, maxAge }: JWTEncodeParams) => {
  //     return encode({
  //       token,
  //       secret,
  //       maxAge,
  //     })
  //   },
  //   decode: async ({ token, secret }: JWTDecodeParams) => {
  //     return decode({ token, secret })
  //   }
  // },
  // events: { // Callback events
  //   signIn: async (message: {
  //     user: User
  //     account: Account | null
  //     profile?: Profile
  //     isNewUser?: boolean
  //   }) => {},
  //   signOut: async (message: { session: Session; token: JWT }) => {},
  //   createUser:  async (message: { user: User }) => {},
  //   updateUser:  async (message: { user: User }) => {},
  //   linkAccount: async (message: {
  //     user: User | AdapterUser
  //     account: Account
  //     profile: User | AdapterUser
  //   }) => {},
  //   session: async (message: { session: Session; token: JWT }) => {}
  // },
  // debug: true, // For debugging
  providers: [
    CredentialsProvider({
      // ! Don't add this
      // - it will assume more than one auth provider
      // - and redirect to a sign-in page meant for oauth
      // - id: 'siwe',
      name: "Ethereum",
      type: "credentials", // default for Credentials
      // Default values if it was a form
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(
              (credentials?.message as string) ?? "{}",
            ) as Partial<SiweMessage>,
          );

          const nonce = await getCsrfToken({ req: { headers: req?.headers } });
          // const nonce = await getCsrfToken({ req });

          const nextAuthUrl = new URL(env.NEXTAUTH_URL);

          const verified = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce,
          });

          if (!verified.success) {
            throw new Error("Verification failed");
          }

          const { data: fields } = verified;

          // Check if user exists
          let user = await prisma.user.findUnique({
            where: {
              address: fields.address,
            },
          });
          // Create new user if doesn't exist
          if (!user) {
            user = await prisma.user.create({
              data: {
                address: fields.address,
                image: "https://www.developerdao.com/D_D_logo-dark.svg",
              },
            });
            // create account
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: fields.address,
              },
            });
          }

          return {
            // Pass user id instead of address
            // id: fields.address
            id: user.id,
            // ...user,
          };
        } catch (error) {
          // Uncomment or add logging if needed
          console.error({ error });
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
});

// Auth Session
// ========================================================
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // Changed from authOptions to authOption(ctx)
  // This allows use to retrieve the csrf token to verify as the nonce
  return getServerSession(ctx.req, ctx.res, authOptions(ctx));
};
