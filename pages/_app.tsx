import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WalletProvider } from '../components/WalletProvider'
import { theme } from '../theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <Box p="1.25em" px="5%" mx={{ base: '2rem', md: '6rem', lg: '10rem' }}>
          <Header />
          <Component {...pageProps} />
        </Box>
      </WalletProvider>
    </ChakraProvider>
  )
}

export default MyApp
