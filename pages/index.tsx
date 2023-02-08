import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from '@components/Hero'

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <Box as="main">
          <Hero />
        </Box>
      </main>
    </div>
  )
}

export default Home
