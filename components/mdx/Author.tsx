import { Box, Text, Link, HStack, Avatar } from '@chakra-ui/react'
import NextLink from 'next/link'
import { contributors } from '@data/contributors'

interface AuthorProps {
  handle: string
}

export function Author({ handle }: AuthorProps) {
  const author = contributors[handle]
  if (!author) {
    return null
  }

  return (
    <Box
      marginY={12}
      paddingY={4}
      paddingBottom={8}
      borderTopWidth="thin"
      borderColor="gray"
    >
      <Text fontSize={25} marginBottom={4}>
        Written by
      </Text>
      <HStack paddingX={2} columnGap={4}>
        <Box>
          <Avatar size="2xl" name={author.displayName} src={author.avatarUrl} />
        </Box>
        <Box>
          {author.moreInfoUrl && (
            <Link
              as={NextLink}
              href={author.moreInfoUrl}
              passHref
              isExternal
              textDecoration="underline"
            >
              {author.displayName}
            </Link>
          )}
          {!author.moreInfoUrl && <Text>{author.displayName}</Text>}

          {author.about && (
            <Box mt={2} maxWidth="xl">
              {author.about}
            </Box>
          )}
        </Box>
      </HStack>
    </Box>
  )
}
