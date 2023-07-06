import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import SchoolOfCodeLogo from "./SchoolOfCodeLogo";
import { useRouter } from "next/router";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
// import { renderDataURI } from "@codingwithmanny/blockies";
// SIWE Integration
import { SiweMessage } from "siwe";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  // Hooks
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  // State
  const [showConnection, setShowConnection] = useState(false);

  // Wagmi Hooks
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  // Functions
  /**
   * Attempts SIWE and establish session
   */
  const onClickSignIn = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        // nonce is used from CSRF token
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  /**
   * Sign user out
   */
  const onClickSignOut = async () => {
    await signOut();
  };

  // Hooks
  /**
   * Handles hydration issue
   * only show after the window has finished loading
   */
  useEffect(() => {
    setShowConnection(true);
  }, []);

  return (
    <Box>
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue("gray.600", "white")}
        minH={"95px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          minH={"95px"}
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
        >
          <Link
            as={NextLink}
            variant="logo"
            href={"/"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          >
            {router.pathname.endsWith("/[slug]") ? (
              <SchoolOfCodeLogo />
            ) : (
              <SchoolOfCodeLogo autoStart={true} loop={true} />
            )}
          </Link>
          {/* <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}
              >
                Logo
              </Text> */}

          <Flex
            justify={"flex-end"}
            alignItems="center"
            display={{ base: "none", md: "flex" }}
            ml={10}
            width={"full"}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          minW={"10rem"}
        >
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
                {!isConnected ? "Connect Wallet" : "Disconnect"}
              </Button>
            </div>
          ) : null}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                // fontSize={'sm'}
                // fontWeight={500}
                // color={linkColor}
                // _hover={{
                //   textDecoration: 'none',
                //   color: linkHoverColor,
                // }}
                variant={
                  router.pathname === navItem.href
                    ? "top-navigation-active"
                    : "top-navigation"
                }
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Get Started",
    href: "/getting-started",
  },
  {
    label: "Tracks",
    href: "/lessons",
  },
];
