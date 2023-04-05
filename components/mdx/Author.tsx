import { Box, Text, Link, HStack, Avatar, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import { contributors } from '@data/contributors'

interface AuthorProps {
  handle: string
  avatarSize?: string
}

export function Author({ handle, avatarSize }: AuthorProps) {
  const author = contributors[handle]
  if (!author) {
    return null
  }

  return (
    <HStack paddingX={2} columnGap={4}>
      <Center width={40}>
        <Avatar
          size={avatarSize}
          name={author.displayName}
          src={author.avatarUrl}
        />
      </Center>
      <Box>
        {author.moreInfoUrl && (
          <Link
            as={NextLink}
            href={author.moreInfoUrl}
            passHref
            isExternal
            textDecoration="underline"
          >
            <Text fontSize={18}>{author.displayName}</Text>
          </Link>
        )}
        {!author.moreInfoUrl && <Text>{author.displayName}</Text>}

        {author.about && (
          <Box mt={2} maxWidth="xl">
            <Text fontSize={14}>{author.about}</Text>
          </Box>
        )}
      </Box>
    </HStack>
  )
}
