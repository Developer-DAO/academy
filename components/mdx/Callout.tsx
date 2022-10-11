import { Box, HStack, useStyleConfig } from '@chakra-ui/react'
import React, { FC } from 'react'

const Callout: FC = (props: any) => {
  const { size, variant, emoji, children, ...rest } = props

  const styles = useStyleConfig('Callout', { size, variant })
  return (
    <Box __css={styles} {...rest}>
      <HStack spacing={4}>
        <Box fontSize={26} mt="0.75em">
          {emoji}
        </Box>
        <Box maxWidth="90%">{children}</Box>
      </HStack>
    </Box>
  )
}

export default Callout
