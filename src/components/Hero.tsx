import {
  Box,
  Heading,
  VStack,
  Container,
  Flex,
  Text,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Image from "next/image";

const Hero = () => {
  return (
    <Container maxW="container.lg" m="0 auto" p={0}>
      <Center>
        <Flex
          minH="100vh"
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
          align={{ base: "center", md: "flex-start" }}
        >
          <VStack flex={1} py={5} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
              <Heading fontSize={["4xl", "6xl"]} color="#FFD500">
                Learning Web3 with friends
              </Heading>

              <Text
                color="white"
                fontSize="lg"
                maxW="20rem"
                pb={["0", "2rem"]}
                alignSelf={{ base: "center", md: "flex-start" }}
              >
                <Box as="span" color="#FFD500" fontWeight="bold">
                  D_D Academy
                </Box>{" "}
                is on a mission to educate coders to the exciting possibilities
                of building web3 Open Source.
              </Text>

              <Link
                href={"/getting-started"}
                alignSelf={{ base: "center", md: "flex-start" }}
              >
                <Button
                  colorScheme="pink"
                  size="lg"
                  fontSize="2xl"
                  fontWeight="700"
                  p="2rem"
                  bgGradient="linear(to-tl, #FF6D9A , #5F4ADF)"
                  color="white"
                  leftIcon={<ArrowForwardIcon />}
                >
                  Get Started
                </Button>
              </Link>
            </VStack>
          </VStack>

          <Box flex={1} order={{ base: -1, md: 1 }}>
            <Image
              // layout="responsive"
              width={459}
              height={674}
              src="/schoolofcode.png"
              alt="D_D Academy"
            />
          </Box>
        </Flex>
      </Center>
    </Container>
  );
};

export default Hero;
