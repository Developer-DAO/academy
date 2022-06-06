import Image from 'next/image'
import MainHeaderLogo from '../assets/logo.svg'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex } from '@chakra-ui/react'

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
      <Image
        src={MainHeaderLogo}
        alt="DEVELOPER DAO LOGO - SCHOOL OF CODE"
      />
      <ConnectButton chainStatus="none" showBalance={false} />
    </Flex>
  );
}
