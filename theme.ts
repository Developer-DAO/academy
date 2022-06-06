import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: `Inter, sans-serif`,
}

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  fonts,
})
