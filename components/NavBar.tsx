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
          <Flex
            alignItems="center"
            display={{ base: 'block', md: 'block', lg: 'none' }}
          >
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                _hover={{ backgroundColor: 'soc.vividViolet' }}
                _active={{ backgroundColor: 'soc.vividViolet' }}
              />
              <MenuList backgroundColor="black">
                <MenuItem _hover={{ backgroundColor: 'soc.vividViolet' }}>
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
                <MenuItem _hover={{ backgroundColor: 'soc.vividViolet' }}>
                  <NextLink href="/getting-started" passHref>
                    <Link
                      variant={
                        router.pathname.startsWith('/getting-started')
                          ? 'top-navigation-active'
                          : 'top-navigation'
                      }
                    >
                      GET STARTED
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem _hover={{ backgroundColor: 'soc.vividViolet' }}>
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
          <Flex
            alignItems="center"
            display={{ base: 'none', md: 'none', lg: 'block' }}
          >
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

            <NextLink href="/getting-started" passHref>
              <Link
                variant={
                  router.pathname.startsWith('/getting-started')
                    ? 'top-navigation-active'
                    : 'top-navigation'
                }
              >
                Get Started
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
