import { Box, Text } from '@chakra-ui/react'

interface AuthorProps {
  author: string
}

export function Author({ author }: AuthorProps) {
  return (
    <Box mt="8" py="5">
      <Text>[Author Bio Goes Here]</Text>
      <Text>{author}</Text>
    </Box>
  )
}
