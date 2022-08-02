import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Image,
  Box,
  Flex,
  Button,
  Spacer,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
          {/*
                MOBILE / HAMBURGER MENU
          */}
          <Flex alignItems="center" display={{ base: 'block', md: 'none' }}>
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList backgroundColor={'soc.vividViolet'}>
                <MenuItem>
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
                </MenuItem>
                <MenuItem>
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
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          {/*
                DESKTOP VERSION
          */}
          <Flex alignItems="center" display={{ base: 'none', md: 'block' }}>
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
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar
