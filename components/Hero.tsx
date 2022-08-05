import {
  AspectRatio,
  Box,
  Heading,
  VStack,
  HStack,
  Container,
  Flex,
  Text,
  Button,
  Center,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Image from 'next/image'

const Hero = () => {
  return (
    <Container maxW="container.lg" m="0 auto" p={0}>
      <Center>
        <Flex
          minH="100vh"
          direction={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
          align={{ base: 'center', md: 'flex-start' }}
        >
          <VStack flex={1} py={20} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start" pt={8}>
              <Heading as="h1" size="4xl" color="#FFD500">
                Learning Web3 with friends
              </Heading>

              <Text
                color="white"
                fontSize="lg"
                maxW="20rem"
                alignSelf={{ base: 'center', md: 'flex-start' }}
              >
                <Box as="span" color="#FFD500" fontWeight="bold">
                  School of Code
                </Box>{' '}
                is on a mission to educate coders to the exciting possibilities
                of building web3 Open Source.
              </Text>

              <Link href={'/lessons'}>
                <Button
                  colorScheme="pink"
                  size="lg"
                  bgGradient="linear(to-tl, #FF6D9A , #5F4ADF)"
                  color="white"
                  alignSelf={{ base: 'center', md: 'flex-start' }}
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
              alt="school of code"
            />
          </Box>
        </Flex>
      </Center>
    </Container>
  )
}

export default Hero
