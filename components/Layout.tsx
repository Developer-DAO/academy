import NavBar from '@components/NavBar'
import Footer from '@components/footer/Footer'
import { Box } from '@chakra-ui/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Box
        p="1.25em"
        px="5%"
        mx={{ base: '2rem', md: '6rem', lg: '10rem' }}
        as="main"
        minH={{ base: 'calc(75vh - 3.5rem)' }}
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
