import {
  Code,
  Heading,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula'
import { useTranslation } from 'next-i18next'

interface LessonProps {
  frontMatter: {
    i18n: string
  }
  mdxSource: MDXRemoteSerializeResult
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

    return <Code fontSize="md" {...props} />
  },
  h1: (props: any) => <Heading as="h1" apply="mdx.h1" {...props} />,
  h2: (props: any) => (
    <Heading as="h2" apply="mdx.h2" fontSize="4xl" {...props} />
  ),
  h3: (props: any) => (
    <Heading as="h3" apply="mdx.h3" fontSize="3xl" {...props} />
  ),
  h4: (props: any) => (
    <Heading as="h4" apply="mdx.h4" fontSize="2xl" {...props} />
  ),
  p: (props: any) => <Text as="p" apply="mdx.p" fontSize="xl" {...props} />,
  a: (props: any) => <Text as="a" apply="mdx.a" fontSize="xl" {...props} />,
  ul: (props: any) => <Text as="ul" apply="mdx.ul" fontSize="xl" {...props} />,
  img: (props: any) => <Image as="img" alt="" apply="mdx.image" {...props} />,
}

const Lesson: React.FC<LessonProps> = ({
  frontMatter: { i18n },
  mdxSource,
}) => {
  const { t } = useTranslation(i18n)
  return (
    <div>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

export default Lesson

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('lessons'))
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { slug } }: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('lessons', slug + '.mdx'),
    'utf-8',
  )
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}
