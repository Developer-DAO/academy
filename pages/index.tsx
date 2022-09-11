import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/Hero'
import * as FullStory from '@fullstory/browser'

const Home: NextPage = () => {
  useEffect(() => {
    FullStory.init({ orgId: 'o-1CKVPB-na1' })
  }, [])
  return (
    <div>
      <Head>
        {/* Primary Meta Tags  */}
        <title>Developer DAO Academy</title>
        <meta name="title" content="Developer DAO Academy" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="D_D Academy is on a mission to educate coders to the exciting possibilities of building web3 Open Source."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://school-of-code.vercel.app" />
        <meta property="og:title" content="Developer DAO Academy" />
        <meta
          property="og:description"
          content="D_D Academy is on a mission to educate coders to the exciting possibilities of building web3 Open Source."
        />
        <meta property="og:image" content="../public/D_D_Academy_Meta.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://school-of-code.vercel.app"
        />
        <meta property="twitter:title" content="Developer DAO's Academy" />
        <meta
          property="twitter:description"
          content="D_D Academy is on a mission to educate coders to the exciting possibilities of building web3 Open Source."
        />
        <meta
          property="twitter:image"
          content="../public/D_D_Academy_Meta.png"
        />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <main>
        <Box as="main">
          <Hero />
        </Box>
      </main>
    </div>
  )
}

export default Home
