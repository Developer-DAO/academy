// Imports
// ========================================================
import React from "react";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";

import "@/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// SIWE Integration
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";
import Layout from "@/components/Layout";
import { env } from "@/env.mjs";

// Config
// ========================================================
/**
 * Configure chains supported
 */
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "D_D Academy",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// App Wrapper Component
// ========================================================
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains}>
              <React.StrictMode>
                <MDXProvider components={Components}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </MDXProvider>
              </React.StrictMode>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

// Exports
// ========================================================
export default api.withTRPC(MyApp);
