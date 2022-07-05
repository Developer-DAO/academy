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
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Image from 'next/image'

const Hero = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        w="full"
        minH="100vh"
        py={20}
        direction={{ base: 'column', md: 'row' }}
        textAlign={{ base: 'center', md: 'left' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <VStack flex={1} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading as="h1" size="4xl" color="#FFD500">
              Learning Web3 with friends
            </Heading>

            <Text>
              <Box as="span" color="#FFD500" fontWeight="bold">
                School of Code
              </Box>{' '}
              is on a mission to educate coders to the exciting possibilities of
              building web3 Open Source.
            </Text>

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
          </VStack>
        </VStack>

        <Box flex={1} order={{ base: -1, md: 1 }}>
          <Image
            // layout="responsive"
            width={659}
            height={874}
            src="/schoolofcode.png"
            alt="school of code"
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default Hero
