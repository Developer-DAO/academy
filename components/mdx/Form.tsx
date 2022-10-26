import { Box, VStack, Text, Button } from '@chakra-ui/react'
import React, { FC } from 'react'

const Form: FC = () => {
  return (
    <VStack spacing={4} background="gray.900" padding="6" borderRadius="md">
      <Text fontWeight="bold" w="100%">
        ❓ Apart from a user wallet, what else uses a blockchain (Ethereum)
        address?
      </Text>
      <Box
        w="100%"
        borderRadius="md"
        background="gray.600"
        padding="3"
        cursor="pointer"
      >
        Transactions
      </Box>
      <Box
        w="100%"
        borderRadius="md"
        background="yellow.600"
        padding="3"
        cursor="pointer"
      >
        Smart Contracts
      </Box>
      <Box
        w="100%"
        borderRadius="md"
        background="gray.600"
        padding="3"
        cursor="pointer"
      >
        Just user wallets have an address
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        alignItems="center"
      >
        <Text w="100%">Question 1/10</Text>
        <Button px="6" colorScheme="facebook">
          Submit
        </Button>
        <Box w="100%" textAlign="right">
          <Button mx="2">Previous</Button>
          <Button>Next</Button>
        </Box>
      </Box>
    </VStack>
  )
}

export default Form
