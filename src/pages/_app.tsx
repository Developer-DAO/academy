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
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  injectedWallet,
  coinbaseWallet,
  safeWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";

// Config
// ========================================================
/**
 * Configure chains supported
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Developer DAO Academy",
  projectId: "123456789",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      braveWallet({ chains }),
      injectedWallet({ chains }),
      coinbaseWallet({ chains, appName: "Developer DAO Academy" }), // "Next dApp" is the name of the app
      safeWallet({ chains }),
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

// App Wrapper Component
// ========================================================
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          //modalSize="compact"
          coolMode={true}
          chains={chains}
          // theme={theme}
        >
          <SessionProvider session={session}>
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
          </SessionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

// Exports
// ========================================================
export default api.withTRPC(MyApp);
