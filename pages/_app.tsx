import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '@theme'
import Header from '@components/Header'
import Footer from '@components/footer/Footer'
import { DefaultSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import Components from '@components/mdx/Components'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Developer DAO Academy</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#000000" />
      </Head>
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
            href: '/favicon/favicon.ico',
          },
        ]}
      />
      <Box p="1.25em" px="5%" mx={{ base: '2rem', md: '6rem', lg: '10rem' }}>
        <Header />
        <MDXProvider components={Components}>
          <Component {...pageProps} />
        </MDXProvider>
        <Footer />
        <Analytics />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
