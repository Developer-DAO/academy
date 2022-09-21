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
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>Developer DAO - {new Date().getFullYear()}</Text>
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
          <NextLink
            href={
              'https://github.com/Developer-DAO/academy/blob/main/CONTRIBUTING.md'
            }
            passHref
          >
            <Link isExternal textDecoration="underline">
              Contribute
            </Link>
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
    </Box>
  )
}
