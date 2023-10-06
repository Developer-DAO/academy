import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '@theme'
import Layout from '@components/Layout'
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
      <MDXProvider components={Components}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
      <Analytics />
    </ChakraProvider>
  )
}

export default MyApp
