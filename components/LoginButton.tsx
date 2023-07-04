import { Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const LoginButton = () => {
  return (
    <Flex minW={'5rem'}>
      <ConnectButton label="Connect wallet" />
    </Flex>
  )
}
export default LoginButton
