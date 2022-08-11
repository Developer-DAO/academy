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
        <title>Developer DAO School of Code</title>
        <meta name="description" content="Developer DAO's school of code" />
        <link rel="icon" href="/favicon.ico" />
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
