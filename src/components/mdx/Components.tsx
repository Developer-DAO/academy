/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Code, Heading, Image, Text } from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula'
import { CopyToClipboard } from '@/components/CopyToClipboard'
import SideDrawer from '@/components/mdx/SideDrawer'
import Quiz from '@/components/mdx/Quiz'
import Question from '@/components/mdx/Question'
import Callout from '@/components/mdx/Callout'
import QuizStatusChecker from './QuizStatusChecker'

const Components = {
  code: (props: any) => {
    const [, language] =
      (props.className as string)?.match(/language-(\w+)/) ?? []

    if (language) {
      return (
        <Box position="relative">
          <SyntaxHighlighter language={language} {...props} style={dracula} />
          <CopyToClipboard {...props} />
        </Box>
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
  SideDrawer,
  Callout,
  Quiz,
  QuizStatusChecker,
  Question,
}

export default Components
