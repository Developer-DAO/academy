import '@fontsource/inter/300.css'
import '@fontsource/inter/800.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '../theme'
import Header from '../components/Header'

import '@rainbow-me/rainbowkit/styles.css'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Developer DAO School of Code',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Box p="1.25em" px="5%">
            <Header />
            <Component {...pageProps} />
          </Box>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
