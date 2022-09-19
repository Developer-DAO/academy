import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from '../components/Hero'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="Developer DAO Academy"
        description="Academy is an open-source education platform created by the
        Developer DAO."
        openGraph={{
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/landing-page-screenshot.png`,
              width: 800,
              height: 600,
              alt: 'Developer DAO Academy',
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
