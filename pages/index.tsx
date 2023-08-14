import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from '@components/Hero'
import PageSeoLayout from '@components/PageSeoLayout'

const Home: NextPage = () => {
  return (
    <PageSeoLayout title="test" description="test">
      <Hero />
    </PageSeoLayout>
  )
}

export default Home
