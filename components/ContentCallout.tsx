import { Box, HStack, useStyleConfig } from '@chakra-ui/react'
import React, { FC } from 'react'

const ComponentCallout: FC = (props: any) => {
  const { size, variant, emoji, children, ...rest } = props

  const styles = useStyleConfig('ContentCallout', { size, variant })
  return (
    <Box __css={styles} {...rest}>
      <HStack spacing={4} align="center">
        <Box fontSize={36}>{emoji}</Box>
        <Box maxWidth="90%">{children}</Box>
      </HStack>
    </Box>
  )
}

export default ComponentCallout
