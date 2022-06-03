import { Box, Flex, Heading, HStack, Icon, VStack } from '@chakra-ui/react'

interface LessonProps {
  lesson: {
    frontMatter: {
      title: string
      description: string
      icons: string[]
    }
  }
  idx: number
}

export const ContentBanner: React.FC<LessonProps> = (props: LessonProps) => {
  const {
    lesson: {
      frontMatter: { title, description, icons },
    },
    idx,
  } = props

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        bg="#35363A"
        p={5}
        rounded={5}
      >
        <Flex justify="space-between">
          <Flex
            bg="#1D1E20"
            w="fit-content"
            fontSize={[8, 10]}
            px={2}
            rounded={5}
            align="center"
            justifyItems="flex-start"
          >
            Lesson {idx + 1}
          </Flex>
          <HStack spacing={2}>
            {icons &&
              icons.map((icon: string) => (
                <Flex
                  bg="#FFFFFF"
                  color="#000000"
                  px={2}
                  justify="center"
                  align="center"
                  rounded={8}
                  fontSize={[10, 14]}
                  fontWeight="bold"
                >
                  {icon}
                </Flex>
              ))}
          </HStack>
        </Flex>
        <Flex color="#FFD500">
          <Heading as="h3" fontSize={[12, 16]} my={2}>
            {title}
          </Heading>
        </Flex>
        <Flex fontSize={[8, 12]} mr={100}>
          {description}
        </Flex>
      </Flex>
    </>
  )
}

// const lessonIcons = [
//   {solidity: '../assets/solidity.png'},
//   {remix: '../assets/remix.png'},
// ]
