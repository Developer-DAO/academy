import { useState } from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WalletProvider } from '../components/WalletProvider'
import { theme } from '../theme'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import ConsentBanner from '../components/ConsentBanner'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  const [consented, setConsented] = useState<boolean>(false)

  const isConsented = (consent: boolean) => {
    setConsented(consent)
  }

  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        {consented && (
          <div>
            {/* @TODO - ADD GOOGLE ANALYTICS KEY NEXT_PUBLIC_GOOGLE_ANALYTICS */}
            {/* <Script
              id="ga-script-1"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload" id="ga-script-2">
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script> */}
          </div>
        )}
        <Box p="1.25em" px="5%" mx={{ base: '2rem', md: '6rem', lg: '10rem' }}>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <ConsentBanner isConsented={isConsented} />
        </Box>
      </WalletProvider>
    </ChakraProvider>
  )
}

export default MyApp
