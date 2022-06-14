import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex } from '@chakra-ui/react'
import SchoolOfCodeLogo from './SchoolOfCodeLogo'

export default function Header() {
  return (
    <Flex
      p="1.25em"
      px="5%"
      display="flex"
      direction="row"
      align="end"
      justify="space-between"
    >
      <SchoolOfCodeLogo autoStart={true} loop={true} />
      <ConnectButton chainStatus="icon" showBalance={false} />
    </Flex>
  )
}
