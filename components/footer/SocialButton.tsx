import { ReactNode } from 'react'
import { Button, VisuallyHidden, useColorModeValue } from '@chakra-ui/react'

export const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      border="0.5px solid gray"
      cursor={'pointer'}
      as={'a'}
      p="2"
      href={href}
      display={'inline-flex'}
      transition={'background 0.3s ease'}
      target="_blank"
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}
