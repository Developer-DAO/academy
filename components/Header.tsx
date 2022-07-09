// import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex, useMediaQuery } from '@chakra-ui/react'
import SchoolOfCodeLogo from './SchoolOfCodeLogo'
import HamburgerIcon from './HamburgerIcon'
import SideDrawer from './SideDrawer'

export default function Header() {
  const [mobile] = useMediaQuery(['(max-width: 425px)'])

  return (
    <Flex
      display="flex"
      direction="row"
      align="end"
      justify="space-between"
      alignItems="center"
    >
      {mobile ? (
        <>
          <img
            src="./assets/logo.svg"
            alt="Developer DAO School of Code logo"
            width="37%"
          />
          <SideDrawer />
        </>
      ) : (
        <SchoolOfCodeLogo autoStart={true} loop={true} />
      )}
      {/* <ConnectButton chainStatus="icon" showBalance={false} /> */}
    </Flex>
  )
}
