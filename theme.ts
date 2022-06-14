import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: `Inter, sans-serif`,
}

const colors = {
  soc: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    // Colors from Figma, with name from coolors.co
    eerieBlack: '#1d1e20',
    ultramarine: '#4e00ec',
    vividViolet: '#ad00ff',
    frenchPink: '#f96c9d',
    schoolBusYellow: '#ffd810',
    ultramarineBlue: '#175df2',
    magenta: '#ff00f5',
    dodgerBlue: '#0094ff',
    gradientLanding:
      'radial-gradient(80% 70% at 80% 20%, #AD00FFFF 0%, #175df200 100%)',
    gradientLessons:
      'radial-gradient(60% 50% at 90% 10%, #AD00FFFF 0%, #175df200 100%)',
    gradientTrack:
      'radial-gradient(20% 15% at 100% 0%, #AD00FFFF 0%, #175df200 100%)',
  },
}

const styles = {
  global: {
    html: {
      bg: colors.soc.eerieBlack,
    },
    body: {
      bg: colors.soc.gradientLanding,
      // bg: colors.soc.gradientLessons,
      // bg: colors.soc.gradientTrack,
    },
  },
}

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  fonts,
  colors,
  styles,
})
