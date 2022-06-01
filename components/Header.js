// components/Header.js
import Image from 'next/image'
import MainHeaderLogo from '../assets/logo.svg'
import ConnectWalletButton from "../components/ConnectWalletButton";
import { Box } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box
      m="40px"
      mx="10%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image
        src={MainHeaderLogo}
        alt="DEVELOPER DAO LOGO - SCHOOL OF CODE"
      />
      <ConnectWalletButton />
    </Box>
  );
}
