import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { ContentBanner } from '../components/ContentBanner'

const SmartContractDevelopmentIndex: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smart Contract Development Track</title>
        <meta
          name="description"
          content="Smart Smart Contract Development Track"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify="center" align="center" as="main" p={3}>
        <VStack spacing={4}>
          <Heading as="h2" color="#F96C9D" fontSize={24}>
            Smart Contract Development Track
          </Heading>
          <Heading as="h3" fontSize={16}>
            CURRENT LESSONS
          </Heading>
          <ContentBanner />
        </VStack>
      </Flex>
    </>
  )
}

export default SmartContractDevelopmentIndex
