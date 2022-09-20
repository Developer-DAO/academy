import { Flex, Stack, Heading } from '@chakra-ui/react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ContentBanner } from '../../components/ContentBanner'

interface LessonProps {
  lessons: {
    path: string
    frontMatter: any
    slug: string
  }[]
}

const Lessons: React.FC<LessonProps> = ({ lessons }) => {
  const result = lessons.reduce((acc: any, curr: any) => {
    if (!acc[curr.path]) acc[curr.path] = []

    acc[curr.path].push(curr)
    return acc
  }, {})

  return (
    <>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column" minH="90vh">
        <Stack spacing={5} direction="column">
          <>
            {Object.entries(result).map((track: any) => {
              return (
                <>
                  <Heading size="lg" color="yellow.300">
                    {track[0].toUpperCase()}
                  </Heading>
                  {track[1].map((lesson: any, idx: number) => {
                    return <ContentBanner key={idx} lesson={lesson} idx={idx} />
                  })}
                </>
              )
            })}
          </>
        </Stack>
      </Flex>
    </>
  )
}

export default Lessons

export const getStaticProps = async () => {
  const directories = fs.readdirSync(path.join('lessons'))
  const lessons: object[] = []
  directories.reverse().map((filename) => {
    fs.readdirSync(path.join('lessons', filename)).map((file) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('lessons', filename, file),
        'utf-8',
      )

      const { data: frontMatter } = matter(markdownWithMeta)
      lessons.push({
        path: filename,
        frontMatter,
        slug: `${file.replace('.mdx', '')}`,
      })
    })
  })
  return {
    props: {
      lessons,
    },
  }
}
