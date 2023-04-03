import { Box, useStyleConfig, Text } from '@chakra-ui/react'

interface LessonHeaderProps {
  title: string
  author: string
}

export function LessonHeader({ title, author }: LessonHeaderProps) {
  const headerStyle = useStyleConfig('LessonHeader')

  return (
    <Box>
      <Box __css={headerStyle}>
        <Text>{title}</Text>
      </Box>
      <div>Author: {author}</div>
    </Box>
  )
}
