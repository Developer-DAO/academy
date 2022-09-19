import { Code, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs, { readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula'
import ContentSideDrawer from '../../../components/ContentSideDrawer'
import ContentCallout from '../../../components/ContentCallout'
import { ActionButton } from '../../../components/ActionButton'

interface LessonProps {
  frontMatter: object
  mdxSource: MDXRemoteSerializeResult
  slug: string
  lessons: any
}

type LessonConnection = Record<string, string>

const LESSONS_GRAPH_LIST: LessonConnection = {
  1: '2',
  2: 'connect-with-rpc',
  'connect-with-rpc': 'ipfs-filecoin_and_arweave',
  'ipfs-filecoin_and_arweave': 'open_zeppelin',
  open_zeppelin: 'testnets',
}

const components = {
  code: (props: any) => {
    const [, language] =
      (props.className as string)?.match(/language-(\w+)/) ?? []

    if (language) {
      return (
        <SyntaxHighlighter language={language} {...props} style={dracula} />
      )
    }

    return <Code fontSize="md" wordBreak="break-all" {...props} />
  },
  h1: (props: any) => (
    <Heading as="h1" apply="mdx.h1" fontSize="4xl" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" apply="mdx.h2" fontSize="3xl" {...props} />
  ),
  h3: (props: any) => (
    <Heading as="h3" apply="mdx.h3" fontSize="2xl" {...props} />
  ),
  h4: (props: any) => (
    <Heading as="h4" apply="mdx.h4" fontSize="xl" {...props} />
  ),
  p: (props: any) => <Text as="p" apply="mdx.p" fontSize="xl" {...props} />,
  a: (props: any) => <Text as="a" apply="mdx.a" {...props} />,
  ul: (props: any) => <Text as="ul" apply="mdx.ul" fontSize="xl" {...props} />,
  img: (props: any) => (
    <Image as="img" apply="mdx.image" m="0 auto" alt="" {...props} />
  ),
  ContentSideDrawer,
  ContentCallout,
}

const Lesson: React.FC<LessonProps> = ({ mdxSource, slug }) => {
  const flexJustifyContentActions = (slug: string) => {
    const shouldHavePrevious = shouldHavePreviousLessonButton(slug)
    const shouldHaveNext = shouldHaveNextLessonButton(slug)

    if (shouldHavePrevious && shouldHaveNext) {
      return 'space-between'
    }

    if (shouldHavePrevious) {
      return 'left'
    }

    if (shouldHaveNext) {
      return 'right'
    }
  }

  const shouldHavePreviousLessonButton = (slug: string) => {
    return (
      Object.values(LESSONS_GRAPH_LIST).filter((value) => value === slug)
        .length > 0
    )
  }

  const shouldHaveNextLessonButton = (slug: string) => {
    return LESSONS_GRAPH_LIST[slug] !== undefined
  }

  const getPreviousButtonHref = (slug: string) => {
    const previousLesson = Object.keys(LESSONS_GRAPH_LIST).find(
      (key) => LESSONS_GRAPH_LIST[key] === slug,
    )
    return `/lessons/${previousLesson}`
  }

  const getNextButtonHref = (slug: string) => {
    return `/lessons/${LESSONS_GRAPH_LIST[slug]}`
  }

  return (
    <>
      <MDXRemote {...mdxSource} components={components} />
      {/* <Flex
        direction="row"
        justifyContent={flexJustifyContentActions(slug)}
        pt="3"
        pb="3"
      >
        {shouldHavePreviousLessonButton(slug) && (
          <ActionButton
            label="Previous Lesson"
            href={getPreviousButtonHref(slug)}
          />
        )}
        {shouldHaveNextLessonButton(slug) && (
          <ActionButton label="Next Lesson" href={getNextButtonHref(slug)} />
        )}
      </Flex> */}
    </>
  )
}

export default Lesson

export const getStaticPaths = async () => {
  const trackDir = path.join('lessons')

  const topicDirectories = fs.readdirSync(trackDir)

  const allPaths: {
    params: {
      lesson: string
      slug: string
      lessons: any
    }
  }[] = []

  topicDirectories.forEach((topic: string) => {
    const topicDirectory = path.join(trackDir, topic)
    const files = fs.readdirSync(topicDirectory)

    files.forEach((fileName: string) => {
      const path = {
        params: {
          lesson: topic,
          slug: fileName.replace('.mdx', ''),
          lessons: files,
        },
      }

      allPaths.push(path)
    })
  })

  return {
    paths: allPaths,
    fallback: false, // if access path/slug that doesn't exist -> 404 page
  }
}

export const getStaticProps = async ({ params: { lesson, slug } }: any) => {
  const learn = fs.readFileSync(path.join('lessons', lesson, slug + '.mdx'))
  const { data: metaData, content } = matter(learn)
  const mdxSource = await serialize(content, { scope: metaData })
  return { props: { mdxSource: mdxSource, lesson, slug } }
}
