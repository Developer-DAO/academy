import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '@theme'
import Header from '@components/Header'
import Footer from '@components/footer/Footer'
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
