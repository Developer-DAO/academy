import { Box, Text, Link, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { QuestionIcon } from '@chakra-ui/icons'

interface LessonHeaderProps {
  title: string
  discussionUrl?: string
}

const DEFAULT_DISCUSSION_URL = 'https://developerdao.peeranha.io/'

export function LessonHeader({ title, discussionUrl }: LessonHeaderProps) {
  let forumLink = discussionUrl || DEFAULT_DISCUSSION_URL

  return (
    <Box>
      <Box>
        <Text
          mt="1.5em"
          fontWeight="bold"
          fontSize="1.875rem"
          letterSpacing={-0.025}
          color="yellow.300"
        >
          {title}
        </Text>
      </Box>
      {forumLink && (
        <HStack
          borderWidth="thin"
          borderColor="gray"
          padding={4}
          marginY={8}
          columnGap={2}
          maxWidth="xl"
        >
          <Box>
            <QuestionIcon w={8} h={8} />
          </Box>
          <Box>
            If you get stuck or have questions please visit our{' '}
            <Link
              as={NextLink}
              href={forumLink}
              passHref
              isExternal
              textDecoration="underline"
            >
              forum
            </Link>
            .
          </Box>
        </HStack>
      )}
    </Box>
  )
}
