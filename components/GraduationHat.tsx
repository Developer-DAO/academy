import { Icon } from '@chakra-ui/react'
import React from 'react'

const GraduationHat = ({ w = '20', h = '10' }) => {
  return (
    <Icon w={w} h={h} viewBox="0 0 100 40" fill="none" stroke="white">
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0" stopColor="rgb(216,144,204)" />
          <stop offset="1" stopColor="rgb(208,64,184)" />
        </linearGradient>
      </defs>
      <path
        strokeWidth="3"
        stroke="url(#gradient)"
        d="
              M50   0l47 10l-47 10l-47 -10z
              M50   10l-37.5 2.5l0 10
              M25   15l0 20q25 15 50 0l0 -20
              M12.5 22.5l-2.5 10c-2.5 10 -2.5 10 2.5 10c5 0 5 0 2.5 -10z
              "
      />
    </Icon>
  )
}

export default GraduationHat
