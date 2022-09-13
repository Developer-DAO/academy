import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: `system-ui, Inter, sans-serif`,
  // body: `Georgia, serif`,
  mono: `Menlo, monospace`,
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
    blackRussian: '#00000f',
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
      bg: colors.soc.blackRussian,
      // bg: colors.soc.gradientLanding,
      // bg: colors.soc.gradientLessons,
      // bg: colors.soc.gradientTrack,
      color: 'gray.300',
    },
  },
}

const components = {
  ContentCallout: {
    baseStyle: {
      bg: colors.soc.eerieBlack,
      borderRadius: '1em',
      px: '1em',
      pb: '1em',
      m: '1em',
    },
    variants: {
      info: {
        borderWidth: '0 0 0 4px',
        borderColor: colors.soc.schoolBusYellow,
      },
    },
  },
  Link: {
    variants: {
      'top-navigation': {
        mr: 9,
        color: 'yellow.300',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        p: '4px',
      },
      'top-navigation-active': {
        mr: 9,
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        backgroundColor: 'yellow.300',
        p: '4px',
        borderRadius: '4px',
        _hover: {
          textDecoration: 'none',
        },
      },
      logo: {
        _hover: {
          textDecoration: 'none',
        },
      },
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
  mdx: {
    h1: {
      mt: '1.5em',
      fontWeight: 'bold',
      fontSize: '1.875rem',
      letterSpacing: '-.025em',
      color: 'yellow.300',
    },
    h2: {
      mt: '1.2em',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      letterSpacing: '-.025em',
      '& + h3': {
        mt: '1.5rem',
      },
    },
    h3: {
      mt: '1em',
      fontWeight: 'semibold',
      fontSize: '1.1rem',
      letterSpacing: '-.025em',
    },
    h4: {
      mt: '0.75em',
      fontWeight: 'semibold',
    },
    a: {
      color: 'steelblue',
      textDecoration: 'underline',
      fontWeight: 'semibold',
      transition: 'color 0.15s',
      transitionTimingFunction: 'ease-out',
      _hover: {
        color: 'slategray',
      },
    },
    p: {
      mt: '0.75em',
      lineHeight: 1.7,
      'blockquote &': {
        mt: 0,
      },
    },
    hr: {
      my: '4rem',
    },
    blockquote: {
      bg: 'orange.100',
      borderWidth: '1px',
      borderColor: 'orange.200',
      rounded: 'lg',
      px: '1.25rem',
      py: '1rem',
      my: '1.5rem',
    },
    ul: {
      mt: '0.5rem',
      ml: '1.25rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        mt: '0.25rem',
      },
    },
    code: {
      bg: 'gray:300',
      rounded: 'sm',
      px: '2em',
      fontSize: '0.875em',
      py: '2px',
      lineHeight: 'normal',
    },
    img: {
      maxWidth: '10vw',
    },
  },
  components,
})
