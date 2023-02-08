import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaTwitter, FaGithub } from 'react-icons/fa'
import { SocialButton } from './SocialButton'

export default function Footer() {
  return (
    <Box
      // bg={useColorModeValue('#00000f', '#1d1e20')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'2xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack direction={'row'} spacing={3}>
          <NextLink
            href={
              'https://github.com/Developer-DAO/academy/issues/new?assignees=&labels=needs+triage%2C+bug&template=bug_report.md&title='
            }
            passHref
          >
            <Link isExternal textDecoration="underline">
              Feedback
            </Link>
          </NextLink>
          <NextLink href={'/docs'} passHref>
            <Link textDecoration="underline">Contribute</Link>
          </NextLink>
        </Stack>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Twitter'}
            href={'https://twitter.com/devdao_academy'}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={'Github'}
            href={'https://github.com/developer-dao/academy'}
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>

      <Container maxW={'6xl'} py={4} centerContent>
        <Text>Developer DAO Foundation © {new Date().getFullYear()}</Text>
        <Text align="center">
          Website content licensed under{' '}
          <NextLink
            href={'http://creativecommons.org/licenses/by-nc/4.0/'}
            passHref
          >
            <Link isExternal textDecoration="underline">
              CC BY-NC 4.0
            </Link>
          </NextLink>
          .
        </Text>
        <Text>
          Website code is licensed under{' '}
          <NextLink
            href={'https://github.com/Developer-DAO/academy/blob/main/LICENSE'}
            passHref
          >
            <Link isExternal textDecoration="underline">
              MIT
            </Link>
          </NextLink>
          .
        </Text>
        <Text>
          <NextLink
            href={'https://www.developerdao.com/privacy-policy'}
            passHref
          >
            <Link isExternal textDecoration="underline">
              Privacy Policy
            </Link>
          </NextLink>
        </Text>
      </Container>
    </Box>
  )
}
