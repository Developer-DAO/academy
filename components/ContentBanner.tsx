import { Flex, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'

interface LessonProps {
  lesson: {
    frontMatter: {
      title: string
      description: string
      icons: string[]
    }
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
            <Flex justify="space-between" align="center">
              <Flex
                bg="#1D1E20"
                fontSize={[0, 6, 8, 10]}
                px={2}
                rounded={5}
                mr={[0, 4, 10, 16]}
              >
                Lesson {idx + 1}
              </Flex>
              <Wrap>
                {icons &&
                  icons.map((icon: string, idx: number) => (
                    <WrapItem
                      key={idx}
                      bg="#FFFFFF"
                      p={1.5}
                      rounded={'50%'}
                      mx="auto"
                    >
                      <Image
                        src={`/assets/${icon}.png`}
                        width={16}
                        height={16}
                        alt={icon}
                      />
                    </WrapItem>
                  ))}
              </Wrap>
            </Flex>
            <Flex color="#FFD500">
              <Heading as="h3" fontSize={[12, 14, 16]} my={2}>
                {title}
              </Heading>
            </Flex>
            <Flex fontSize={[0, 0, 10, 12]} mr={100}>
              {description}
            </Flex>
          </Flex>
        </a>
      </Link>
    </>
  )
}
