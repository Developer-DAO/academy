import { Center, Flex, Text, chakra } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Banner = () => {
  const dismissBanner = () => {
    localStorage.setItem("bannerDismissed", "true");
    const banner = document.getElementById("banner");
    if (banner) {
      banner.style.display = "none";
    }
  };

  return (
    <Center
      py="2"
      px="3"
      bgGradient="linear(to-r,cyan.700, purple.500)"
      color="white"
      textAlign="center"
      id="banner"
    >
      <Flex align="center" fontSize="sm">
        <Text fontWeight="medium" maxW={{ base: "32ch", md: "unset" }}>
          Acamdey V2 is coming soon 👀... Subscribe to our newsletter for
          updates!
        </Text>
        <chakra.a
          flexShrink={0}
          href="https://developerdao.substack.com/s/probably-nothing"
          target="_blank"
          ms="6"
          bg="blackAlpha.300"
          color="whiteAlpha.900"
          fontWeight="semibold"
          px="3"
          py="1"
          rounded="base"
        >
          Subscribe now!{" "}
        </chakra.a>
        <chakra.button
          onClick={dismissBanner}
          ms="6"
          color="whiteAlpha.900"
          fontWeight="semibold"
          px="3"
          py="1"
          rounded="base"
        >
          <CloseIcon />
        </chakra.button>
      </Flex>
    </Center>
  );
};

export default Banner;
