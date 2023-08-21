import type { NextPage } from 'next'
import Hero from '@components/Hero'
import PageSeoLayout from '@components/PageSeoLayout'

const Home: NextPage = () => {
  return (
    <PageSeoLayout
      title="Learn Web3"
      description="D_D Academy is on a mission to educate coders to the exciting possibilities of building web3 Open Source."
    >
      <Hero />
    </PageSeoLayout>
  )
}

export default Home
