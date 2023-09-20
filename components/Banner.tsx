import { Center, Flex, Text, chakra } from '@chakra-ui/react'

const Banner = () => {
  return (
    <Center
      py="2"
      px="3"
      bgGradient="linear(to-r,cyan.700, purple.500)"
      color="white"
      textAlign="center"
    >
      <Flex align="center" fontSize="sm">
        <Text fontWeight="medium" maxW={{ base: '32ch', md: 'unset' }}>
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
          Subscribe now!{' '}
        </chakra.a>
      </Flex>
    </Center>
  )
}

export default Banner
