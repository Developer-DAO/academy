// Imports
// ========================================================
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
// import { renderDataURI } from "@codingwithmanny/blockies";
// SIWE Integration
import { SiweMessage } from "siwe";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

// Auth Component
// ========================================================
const AuthShowcase: React.FC = () => {
  // Hooks
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  // State
  const [showConnection, setShowConnection] = useState(false);

  // Wagmi Hooks
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  // Functions
  /**
   * Attempts SIWE and establish session
   */
  const onClickSignIn = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        // nonce is used from CSRF token
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  /**
   * Sign user out
   */
  const onClickSignOut = async () => {
    await signOut();
  };

  // Hooks
  /**
   * Handles hydration issue
   * only show after the window has finished loading
   */
  useEffect(() => {
    setShowConnection(true);
  }, []);

  // Render
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData ? (
        <div className="mb-4 text-center">
          {sessionData ? (
            <div className="mb-4">
              <label className="mb-2 block text-white/80">Logged in as</label>
              {/* {sessionData?.user?.id ? (
                <Image
                  width={"80"}
                  height={"80"}
                  alt={`${sessionData.user.id}`}
                  className="mx-auto my-4 border-8 border-white/30"
                  // src={`${renderDataURI({
                  //   seed: sessionData.user.id,
                  //   size: 10,
                  //   scale: 8,
                  // })}`}
                />
              ) : null} */}
              <code className="block rounded bg-black/20 p-4 text-white">
                {JSON.stringify(sessionData)}
              </code>
            </div>
          ) : null}
          {secretMessage ? (
            <p className="mb-4">
              <label className="mb-2 block text-white/80">Secret Message</label>
              <code className="block rounded bg-black/20 p-4 text-white">
                {secretMessage}
              </code>
            </p>
          ) : null}

          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={onClickSignOut as () => void}
          >
            Sign Out
          </button>
        </div>
      ) : showConnection ? (
        <div className="mb-4">
          {isConnected ? (
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={onClickSignIn as () => void}
            >
              Sign In
            </button>
          ) : null}
        </div>
      ) : null}
      {showConnection ? (
        <div className="text-center">
          {address ? (
            <p className="mb-4">
              <code className="block rounded bg-black/20 p-4 text-white">
                {address}
              </code>
            </p>
          ) : null}
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => (!isConnected ? connect() : disconnect())}
          >
            {!isConnected ? "Connect Wallet" : "Disconnect"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

// Page Component
// ========================================================
const Home: NextPage = () => {
  // Requests
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // Render
  return (
    <>
      <Head>
        <title>Create T3 App SIWE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App SIWE
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="mb-4 block h-10">
              {/* HERE - new todo link */}
              <Link
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                href="/todos"
              >
                (Protected) Todos Page
              </Link>
            </div>
            <p className="mb-4 block text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

// Exports
// ========================================================
export default Home;
