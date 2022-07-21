import React from 'react'
import {
  Image,
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Link,
  IconButton,
} from '@chakra-ui/react'
import HamburgerIcon from './HamburgerIcon'
import SchoolOfCodeLogo from './SchoolOfCodeLogo'
// import { ConnectButton } from '@rainbow-me/rainbowkit'

function NavBar() {
  return (
    <Box>
      <Flex justify="left" alignItems="center">
        <Link variant="logo" href={'/'}>
          <SchoolOfCodeLogo autoStart={true} loop={true} />
        </Link>
        <Spacer />
        <Box>
          <Flex alignItems="center">
            <Link variant="top-navigation" href={'/'}>
              Home
            </Link>
            <Link variant="top-navigation" href={'/lessons'}>
              Tracks
            </Link>
            {/* <Button colorScheme="gray" variant="solid">
              <ConnectButton chainStatus="icon" showBalance={false} />
            </Button> */}
            {/* <IconButton
              aria-label="Search database"
              variant="ghost"
              icon={<HamburgerIcon />}
            /> */}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar
