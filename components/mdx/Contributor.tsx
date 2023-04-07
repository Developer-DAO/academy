import { Box, Text, Link, HStack, Avatar, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import { contributors } from '@data/contributors'

interface ContributorProps {
  handle: string
  avatarSize?: string
}

export function Contributor({ handle, avatarSize }: ContributorProps) {
  const contrib = contributors[handle]
  if (!contrib) {
    return null
  }

  return (
    <HStack paddingX={2} columnGap={4}>
      <Center width={40}>
        {contrib.moreInfoUrl ? (
          <Link
            as={NextLink}
            href={contrib.moreInfoUrl}
            passHref
            isExternal
            textDecoration="underline"
          >
            <Avatar
              size={avatarSize}
              name={contrib.displayName}
              src={contrib.avatarUrl}
            />
          </Link>
        ) : (
          <Avatar
            size={avatarSize}
            name={contrib.displayName}
            src={contrib.avatarUrl}
          />
        )}
      </Center>
      <Box>
        {contrib.moreInfoUrl ? (
          <Link
            as={NextLink}
            href={contrib.moreInfoUrl}
            passHref
            isExternal
            textDecoration="underline"
          >
            <Text fontSize={18}>{contrib.displayName}</Text>
          </Link>
        ) : (
          <Text>{contrib.displayName}</Text>
        )}

        {contrib.about && (
          <Box mt={2} maxWidth="xl">
            <Text fontSize={14}>{contrib.about}</Text>
          </Box>
        )}
      </Box>
    </HStack>
  )
}
