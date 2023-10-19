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
  darkTheme,
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
import { polygon, polygonMumbai } from "wagmi/chains";
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

const CURRENT_CHAIN =
  process.env.VERCEL_ENV !== undefined &&
  process.env.VERCEL_ENV === "production"
    ? polygon
    : polygonMumbai;

const { chains, publicClient } = configureChains(
  [CURRENT_CHAIN],
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
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#6f51cf",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
              chains={chains}
              initialChain={polygonMumbai}
            >
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

export default api.withTRPC(MyApp);
