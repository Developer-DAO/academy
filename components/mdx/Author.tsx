import { Box, Text, Link, HStack, Avatar } from '@chakra-ui/react'
import NextLink from 'next/link'

interface AuthorProps {
  handle: string
}

interface AuthorDetails {
  displayName: string
  moreInfoUrl?: string
  avatarUrl?: string
  about?: string
}

interface AuthorLookup {
  [key: string]: AuthorDetails
}

const authors: AuthorLookup = {
  brianfive: {
    displayName: 'Brian Gershon',
    moreInfoUrl: 'https://brianfive.xyz',
    avatarUrl: 'https://brianfive.xyz/profile.png',
    about:
      'Brian has been a member of the DeveloperDAO since November 2021, and enjoys building Web3 user experiences and smart contracts. Also active with Next.js, React and Serverless.',
  },
}

export function Author({ handle }: AuthorProps) {
  const author = authors[handle]
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
