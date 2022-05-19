import {Heading} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Developer DAO School of Code</title>
        <meta name="description" content="Developer DAO's school of code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar/>
        <Heading>Education Platform</Heading>
      </main>
    </div>
  )
}

export default Home
