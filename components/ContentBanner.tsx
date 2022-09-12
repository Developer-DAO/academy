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
    path: string
    slug: string
  }
  idx: number
}

export const ContentBanner: React.FC<LessonProps> = (props: LessonProps) => {
  const {
    lesson: {
      path,
      frontMatter: { title, description, icons },
      slug,
    },
    idx,
  } = props

  return (
    <>
      <Link key={slug} href={`/lessons/${path}/${slug}`} passHref>
        <a>
          <Flex direction="column" bg="gray.800" p={5} rounded={5}>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              // bg="#35363A"
            >
              <Flex direction="column" justifyContent="center">
                <Flex color="#FFD500">
                  <Heading
                    as="h3"
                    apply="mdx.h3"
                    fontSize={[14, 14, 16]}
                    my={2}
                  >
                    {title}
                  </Heading>
                </Flex>
              </Flex>
              {/* <Flex
                bg="#00000f"
                fontSize={[0, 6, 8, 10]}
                px={2}
                rounded={5}
                mr={[0, 4, 10, 16]}
                apply="mdx.p"
              >
                Lesson {idx + 1}
              </Flex> */}
              <Wrap ml={20}>
                {icons &&
                  icons.map((icon: string, idx: number) => (
                    <WrapItem
                      key={idx}
                      bg="#FFFFFF"
                      p={1.5}
                      rounded={'50%'}
                      mx="auto"
                      title={icon}
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
            <Flex fontSize={[10, 10, 12, 14]} pt={4}>
              {description}
            </Flex>
          </Flex>
        </a>
      </Link>
    </>
  )
}
