import { Box } from "@chakra-ui/react";
import Topbar from "./Topbar";
import Footer from "./footer/Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Topbar />
      <Box
        as="main"
        p="1.25em"
        px="5%"
        mx={{ base: "2rem", md: "6rem", lg: "10rem" }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
