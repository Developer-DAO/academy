import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from '../components/Hero'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="Developer DAO Academy"
        description="Developer DAO Academy"
        openGraph={{
          images: [
            {
              url: '/landing-page-screenshot.png',
              width: 800,
              height: 600,
              alt: 'Developer DAO School of Code',
              type: 'image/png',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      <main>
        <Box as="main">
          <Hero />
        </Box>
      </main>
    </div>
  )
}

export default Home
