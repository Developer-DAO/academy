// components/Header.js
import Image from 'next/image'
import MainHeaderLogo from '../assets/logo.svg'
import ConnectWalletButton from "../components/ConnectWalletButton";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px",
        marginLeft: "12%",
        marginRight: "12%",
      }}
    >
      <Image
        src={MainHeaderLogo}
        alt="DEVELOPER DAO LOGO - SCHOOL OF CODE"
      />
      <ConnectWalletButton />
    </div>
  );
}
