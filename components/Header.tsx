import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex } from '@chakra-ui/react'
import SchoolOfCodeLogo from './SchoolOfCodeLogo'

export default function Header() {
  return (
    <Flex
      m="40px"
      mx="10%"
      display="flex"
      direction="row"
      align="center"
      justify="space-between"
    >
      <SchoolOfCodeLogo autoStart={true} loop={true} />
      <ConnectButton chainStatus="none" showBalance={false} />
    </Flex>
  )
}
