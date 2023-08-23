// Imports
// ========================================================
import React, { type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { type AppProps } from "next/app";

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
import { env } from "@/env.mjs";
import { AppContextProvider } from "@/contexts/AppContextProvider";
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

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

// App Wrapper Component
// ========================================================
const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider theme={theme}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} initialChain={polygonMumbai}>
              <MDXProvider components={Components}>
                <AppContextProvider>
                  {getLayout(<Component {...pageProps} />)}
                </AppContextProvider>
              </MDXProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
};

// Exports
// ========================================================
export default api.withTRPC(MyApp);
