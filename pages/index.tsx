import { Heading, IconButton, Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import HamburgerIcon from '../components/HamburgerIcon'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Developer DAO School of Code</title>
        <meta name="description" content="Developer DAO's school of code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex justify={'end'}>
          <Box mr={4}>
            <IconButton aria-label='Search database' variant='ghost' icon={<HamburgerIcon />} />
          </Box>
        </Flex>
        <Heading>Education Platform</Heading>
      </main>
    </div>
  )
}

export default Home
