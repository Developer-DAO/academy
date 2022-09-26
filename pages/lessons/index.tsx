import { Flex, Stack, Heading, Box } from '@chakra-ui/react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ContentBanner } from '../../components/ContentBanner'

interface Lesson {
  path: string
  frontMatter: any
  slug: string
}

interface LessonProps {
  lessons: Lesson[]
}

interface LessonTrackMap {
  [key: string]: Lesson[]
}

const Lessons: React.FC<LessonProps> = ({ lessons }: { lessons: Lesson[] }) => {
  const result = lessons.reduce((acc: LessonTrackMap, curr) => {
    if (!acc[curr.path]) {
      // initial an array of lessons for a given track
      acc[curr.path] = []
    }
    acc[curr.path].push(curr)
    return acc
  }, {})

  return (
    <>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column" minH="90vh">
        <Stack spacing={5} direction="column">
          <>
            {Object.entries(result).map((track, idx: number) => {
              const trackName = track[0].toUpperCase()
              const lessons = track[1]
              return (
                <Box key={idx}>
                  <Heading size="lg" color="yellow.300">
                    {trackName}
                  </Heading>
                  {lessons.map((lesson: Lesson, idx: number) => {
                    return (
                      <Box marginTop="4" key={idx}>
                        <ContentBanner lesson={lesson} idx={idx} />
                      </Box>
                    )
                  })}
                </Box>
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
  const lessons: Lesson[] = []
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
