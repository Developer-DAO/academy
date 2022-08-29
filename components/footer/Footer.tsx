import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
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
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Twitter'}
            href={'https://twitter.com/ddschoolofcode'}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={'Github'}
            href={'https://github.com/developer-dao/school-of-code'}
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
