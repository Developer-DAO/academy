import { Flex, Heading, HStack, SimpleGrid, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'

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

  console.log(typeof icons[0])

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
            <Flex justify="space-between" align="center">
              <Flex
                bg="#1D1E20"
                fontSize={[6, 8, 10]}
                px={2}
                rounded={5}
                mr={[6, 10, 16]}
              >
                Lesson {idx + 1}
              </Flex>
              <Wrap>
                {icons &&
                  icons.map((icon: string) =>
                  (
                    // <Flex
                    //   bg="#FFFFFF"
                    //   color="#000000"
                    //   p={0.5}
                    //   justify="center"
                    //   align="center"
                    //   rounded={"50%"}
                    //   fontSize={[8, 10, 12, 14]}
                    //   fontWeight="bold"
                    // >
                    <WrapItem bg="#FFFFFF" p={0.5} rounded={"50%"}>
                      <Image src={`/assets/${icon}.png`} width={12} height={12} />
                    </WrapItem>
                    // </Flex>
                  ))}
              </Wrap>
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

// const lessonIcons = {
//   solidity: '/assets/solidity.png',
//   remix: '/assets/remix.png',
// }
