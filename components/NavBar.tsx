import React from 'react'
import { Image, Box, Flex, Heading, Button, Spacer, Link } from '@chakra-ui/react'

function NavBar() {
  return (
    <Box pl='235px' pr='235px' >
      <Flex justify='center' alignItems='center'>
        <Box my={-20}>
          <Image boxSize={{ base: '120px', md: '300px' }} src="/logo.svg" />
        </Box>
        <Spacer />
        <Box>
          <Flex alignItems='center'>
            <Link pr = '9' color= "yellow.300">JOIN THE COMMUNITY</Link>
            <Button colorScheme='gray' variant='solid'>Connect Wallet</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>

  )
}

export default NavBar