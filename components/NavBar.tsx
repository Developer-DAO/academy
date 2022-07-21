import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  return (
    <Box>
      <Flex justify="left" alignItems="center">
        <Link variant="logo" href={'/'}>
          <SchoolOfCodeLogo autoStart={true} loop={true} />
        </Link>
        <Spacer />
        <Box>
          <Flex alignItems="center">
            <NextLink href="/" passHref>
              <Link
                variant={
                  router.pathname === '/'
                    ? 'top-navigation-active'
                    : 'top-navigation'
                }
              >
                Home
              </Link>
            </NextLink>

            <NextLink href="/lessons" passHref>
              <Link
                variant={
                  router.pathname.startsWith('/lessons')
                    ? 'top-navigation-active'
                    : 'top-navigation'
                }
              >
                Tracks
              </Link>
            </NextLink>

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
