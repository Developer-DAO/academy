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
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  ledgerWallet,
  trustWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";

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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Config
// ========================================================
/**
 * Configure chains supported
 */
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_ID;

const { wallets } = getDefaultWallets({
  appName: "D_D Academy",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      zerionWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// App Wrapper Component
// ========================================================
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} initialChain={polygonMumbai}>
              <MDXProvider components={Components}>
                <Layout>
                  <>
                    <Component {...pageProps} />
                    <ReactQueryDevtools />
                  </>
                </Layout>
              </MDXProvider>
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
