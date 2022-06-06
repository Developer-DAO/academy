import { Container, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import Link from 'next/link'

interface LessonProps {
  lesson: {
    frontMatter: {
      title: string
      description: string
      icons: string[]
    },
    slug: string
  }
  idx: number
}

export const ContentBanner: React.FC<LessonProps> = (props: LessonProps) => {
  const {
    lesson: {
      frontMatter: { title, description, icons },
      slug,
    },
    idx,
  } = props

  return (
    <>
      <Link href={'/lessons/' + slug} passHref>
        <a>
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
                fontSize={[6, 8, 10]}
                px={2}
                rounded={5}
                align="center"
                justifyItems="flex-start"
              >
                Lesson {idx + 1}
              </Flex>
              <Stack direction={["column", "row"]}>
                {icons &&
                  icons.map((icon: string) => (
                    <Flex
                      bg="#FFFFFF"
                      color="#000000"
                      px={2}
                      justify="center"
                      align="center"
                      rounded={8}
                      fontSize={[8, 10, 12, 14]}
                      fontWeight="bold"
                    >
                      {icon}
                    </Flex>
                  ))}
              </Stack>
            </Flex>
            <Flex color="#FFD500">
              <Heading as="h3" fontSize={[12, 14, 16]} my={2}>
                {title}
              </Heading>
            </Flex>
            <Flex fontSize={[0, 8, 8, 12]} mr={100}>
              {description}
            </Flex>
          </Flex>
        </a>
      </Link>
    </>
  )
}

// const lessonIcons = [
//   {solidity: '../assets/solidity.png'},
//   {remix: '../assets/remix.png'},
// ]
