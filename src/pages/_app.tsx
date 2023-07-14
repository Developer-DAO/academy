// Imports
// ========================================================
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import "@/styles/globals.css";
// SIWE Integration
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import Topbar from "@/components/Topbar";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// Config
// ========================================================
/**
 * Configure chains supported
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

/**
 * Configure publicProvider and allow for auto wallet connection
 */
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Developer DAO Academy",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// App Wrapper Component
// ========================================================
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <SessionProvider session={session} refetchInterval={0}>
          {/* <Box
            p="1.25em"
            px="5%"
            mx={{ base: "2rem", md: "6rem", lg: "10rem" }}
          > */}
          {/* <Topbar /> */}
          <MDXProvider components={Components}>
            <Component {...pageProps} />
          </MDXProvider>
          {/* </Box> */}
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

// Exports
// ========================================================
export default api.withTRPC(MyApp);
