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
//Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { injectedWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

// Config
// ========================================================
/**
 * Configure chains supported
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      coinbaseWallet({ chains, appName: "Developer DAO Academy" }),
    ],
  },
]);

/**
 * Configure publicProvider and allow for auto wallet connection
 */
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const getSiweMessageOptions = () => ({
  statement: "Sign in to Developer DAO Academy",
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
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider chains={chains}>
              <Box
                p="1.25em"
                px="5%"
                mx={{ base: "2rem", md: "6rem", lg: "10rem" }}
              >
                <Topbar />
                <MDXProvider components={Components}>
                  <Component {...pageProps} />{" "}
                </MDXProvider>
              </Box>
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
