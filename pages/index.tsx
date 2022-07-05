import { Heading, Box, Flex } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer";
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Developer DAO School of Code</title>
        <meta name="description" content="Developer DAO's school of code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box as="main" p={3}>
          <Flex align="center">
            <SideDrawer />
            <Header />
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Home;
