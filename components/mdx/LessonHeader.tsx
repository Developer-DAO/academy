import { Box, useStyleConfig, Text, Link, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { QuestionIcon } from '@chakra-ui/icons'

interface LessonHeaderProps {
  title: string
  discussionUrl: string
}

export function LessonHeader({ title, discussionUrl }: LessonHeaderProps) {
  const headerStyle = useStyleConfig('LessonHeader')

  return (
    <Box>
      <Box __css={headerStyle}>
        <Text>{title}</Text>
      </Box>
      <HStack
        borderWidth="thin"
        borderColor="gray"
        padding="4"
        marginY="8"
        columnGap={2}
        maxWidth="xl"
      >
        <Box>
          <QuestionIcon w={12} h={12} />
        </Box>
        <Box>
          Please visit our{' '}
          <Link
            as={NextLink}
            href={discussionUrl}
            passHref
            isExternal
            textDecoration="underline"
          >
            forum
          </Link>{' '}
          for questions or more discussion.
        </Box>
      </HStack>
    </Box>
  )
}
