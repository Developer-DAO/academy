import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WalletProvider } from '../components/WalletProvider'
import { theme } from '../theme'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import ConsentBanner from '../components/ConsentBanner'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/landing-page-screenshot.png`,
            site_name: 'Developer DAO Academy',
            title: 'Developer DAO Academy',
            description:
              'Academy is an open-source education platform created by the Developer DAO.',
            images: [
              {
                url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/landing-page-screenshot.png`,
                alt: 'Developer DAO Academy',
                type: 'image/png',
              },
            ],
          }}
          twitter={{
            handle: '@devdao_academy',
            site: '@devdao_academy',
            cardType: 'summary_large_image',
          }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
        />
        <Box p="1.25em" px="5%" mx={{ base: '2rem', md: '6rem', lg: '10rem' }}>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <ConsentBanner />
        </Box>
      </WalletProvider>
    </ChakraProvider>
  )
}

export default MyApp
