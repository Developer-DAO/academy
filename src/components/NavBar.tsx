import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Spacer,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import HamburgerIcon from '@/components/HamburgerIcon'
import SchoolOfCodeLogo from '@/components/SchoolOfCodeLogo'
import { PomodoroTimer } from '@/components/PomodoroTimer'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
// import { api } from '@/utils/api'
// import { renderDataURI } from "@codingwithmanny/blockies";
// SIWE Integration
import { SiweMessage } from 'siwe'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useNetwork,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function NavBar() {
  const router = useRouter()
  // Hooks
  const { data: sessionData } = useSession()
  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );
  // State
  const [showConnection, setShowConnection] = useState(false)

  // Wagmi Hooks
  const { signMessageAsync } = useSignMessage()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  // Functions
  /**
   * Attempts SIWE and establish session
   */
  const onClickSignIn = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        // nonce is used from CSRF token
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      await signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      })
    } catch (error) {
      window.alert(error)
    }
  }

  /**
   * Sign user out
   */
  const onClickSignOut = async () => {
    await signOut()
  }

  // Hooks
  /**
   * Handles hydration issue
   * only show after the window has finished loading
   */
  useEffect(() => {
    setShowConnection(true)
  }, [])

  return (
    <Box as="header">
      <Flex justify="left" alignItems="center">
        <Link as={NextLink} variant="logo" href={'/'}>
          {router.pathname.endsWith('/[slug]') ? (
            <SchoolOfCodeLogo />
          ) : (
            <SchoolOfCodeLogo autoStart={true} loop={true} />
          )}
        </Link>
        <Spacer />
        {/*
                POMODORO TIMER
          */}
        {router.pathname.startsWith('/lessons') ? <PomodoroTimer /> : ''}
        <Box>
          {/*
                MOBILE / HAMBURGER MENU
          */}
          <Flex
            mt={6}
            alignItems="center"
            display={{ base: 'block', md: 'block', lg: 'none' }}
          >
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                ml={5}
                variant="outline"
              />
              <MenuList backgroundColor={'soc.vividViolet'}>
                <MenuItem>
                  <Link
                    as={NextLink}
                    href="/"
                    passHref
                    variant={
                      router.pathname === '/'
                        ? 'top-navigation-active'
                        : 'top-navigation'
                    }
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={NextLink}
                    href="/getting-started"
                    passHref
                    variant={
                      router.pathname.startsWith('/getting-started')
                        ? 'top-navigation-active'
                        : 'top-navigation'
                    }
                  >
                    GET STARTED
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={NextLink}
                    href="/lessons"
                    passHref
                    variant={
                      router.pathname.startsWith('/lessons')
                        ? 'top-navigation-active'
                        : 'top-navigation'
                    }
                  >
                    Tracks
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          {/*
                DESKTOP VERSION
          */}
          <Flex
            mt="6"
            alignItems="center"
            display={{ base: 'none', md: 'none', lg: 'block' }}
          >
            <Link
              as={NextLink}
              href="/"
              passHref
              variant={
                router.pathname === '/'
                  ? 'top-navigation-active'
                  : 'top-navigation'
              }
            >
              Home
            </Link>
            <Link
              as={NextLink}
              href="/getting-started"
              passHref
              variant={
                router.pathname.startsWith('/getting-started')
                  ? 'top-navigation-active'
                  : 'top-navigation'
              }
            >
              Get Started
            </Link>
            <Link
              as={NextLink}
              href="/lessons"
              passHref
              variant={
                router.pathname.startsWith('/lessons')
                  ? 'top-navigation-active'
                  : 'top-navigation'
              }
            >
              Tracks
            </Link>
            {sessionData ? (
              <div className="mb-4 text-center">
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={onClickSignOut as () => void}
                >
                  Sign Out
                </button>
              </div>
            ) : showConnection ? (
              <div className="mb-4">
                {/* {chain?.unsupported ? (
                  <button onClick={() => switchNetwork?.()}>
                    {`Switch to ${polygonMumbai.name}`}
                    {isLoading &&
                      pendingChainId === polygonMumbai.id &&
                      " (switching)"}
                  </button> */}
                {isConnected ? (
                  <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                    onClick={onClickSignIn as () => void}
                  >
                    Sign In
                  </button>
                ) : null}
              </div>
            ) : null}
            {showConnection ? (
              <div className="text-center">
                {address ? (
                  <p className="mb-4">
                    <code className="block rounded bg-black/20 p-4 text-white">
                      {address}
                    </code>
                  </p>
                ) : null}
                <Button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => (!isConnected ? connect() : disconnect())}
                >
                  {!isConnected ? 'Connect Wallet' : 'Disconnect'}
                </Button>
              </div>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar
