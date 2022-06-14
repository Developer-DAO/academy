import GraduationHat from './GraduationHat'
import { Box, HStack, Icon, VStack, keyframes } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const DELETE_SPEED = 150
const WRITE_SPEED = 150

const DEVELOPER_DAO = 'DEVELOPER DAO'
const DEVELOPER_D = 'DEVELOPER D'
const D = 'D'

const STATUS_COUNT = 16

// Possible Component Status (must reflect STATUS_COUNT)
//   01: Initial State
//   02: Show Cursor
//   03: Start Removing Letters
//   04: Remove Letter (also adds second letter D when doing 'backspace')
//   05: Stop Blinking
//   06: Show Hat
//   07: Start Smiling
//   08: Close Eyes
//   09: Open Eyes
//   10: Hide Hat
//   11: Stop Smiling
//   12: Start Blinking
//   13: Remove Second D Letter
//   14: Add Letter
//   15: Hide Cursor
//   16: Final State

type SchoolOfCodeLogoProps = {
  autoStart?: boolean
  loop?: boolean
  clickToStart?: boolean
  logToConsole?: boolean
  deleteSpeed?: number
  writeSpeed?: number
  size?: number
}

const SchoolOfCodeLogo: NextPage<SchoolOfCodeLogoProps> = ({
  autoStart = false,
  loop = false,
  clickToStart = true,
  logToConsole = false,
  deleteSpeed = DELETE_SPEED,
  writeSpeed = WRITE_SPEED,
}) => {
  const INTERVAL_WAIT = 3 * DELETE_SPEED // 450
  const CURSOR_WAIT = 10 * WRITE_SPEED // 1500
  const STATIC_WAIT = 5 * CURSOR_WAIT // 7500

  const cursorBorderCSS = `2px solid #d685c8`
  const cursorBorderRadiusCSS = `.1875em`

  const cursorKeyframes = keyframes`
    0% { opacity: 1; }
   60% { opacity: 1; }
   61% { opacity: 0; }
   99% { opacity: 0; }
  100% { opacity: 1; }
  `
  const eyeKeyframes = keyframes`
    from { transform: scale(1,1); }
    to   { transform: scale(1,0.1); top 80%; }
  `
  const cursorAnimation = `${cursorKeyframes} .6s infinite`
  const eyeAnimation = `${eyeKeyframes} ${
    CURSOR_WAIT / 4000
  }s infinite alternate`

  const [status, setStatus] = useState(0)
  const [dev, setDev] = useState(DEVELOPER_DAO)
  const [dao, setDao] = useState('')
  const [cursorBorder, setCursorBorder] = useState('0')
  const [cursorBorderRadius, setCursorBorderRadius] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)
  const [cursorAnimationCSS, setCursorAnimationCSS] = useState(cursorAnimation)
  const [eyeAnimationCSS, setEyeAnimationCSS] = useState('')
  const [showGraduationHat, setShowGraduationHat] = useState(false)

  const didMount = useRef(false)

  const addCharDev = () => setDev(dev + DEVELOPER_DAO[dev.length])
  const delCharDev = (count: number = 1) => setDev(dev.slice(0, -1 * count))

  const showD = () => setDao(D)
  const hideD = () => setDao('')

  const incStatus = (step: number = 1) => {
    const newStatus = (status + step) % STATUS_COUNT
    logMessage(`calling setStatus(${newStatus})`)
    setStatus(newStatus)
  }

  const logMessage = (msg: string) => {
    if (logToConsole) console.log(msg)
    return
  }

  const startAnimation = () => {
    setIsAnimating(true)
  }

  const stopAnimation = () => {
    setIsAnimating(false)
  }

  const showCursor = () => {
    setCursorBorder(cursorBorderCSS)
    incStatus()
  }

  const startRemovingLettters = () => {
    incStatus()
  }

  const removeLetter = () => {
    if (dev.length <= 1) {
      incStatus()
      return
    }
    if (dev === DEVELOPER_D) {
      delCharDev(2)
      showD()
      return
    }
    delCharDev()
  }

  const stopBlinking = () => {
    setCursorAnimationCSS('')
    incStatus()
  }

  const showHat = () => {
    setShowGraduationHat(true)
    incStatus()
  }

  const startSmiling = () => {
    setCursorBorderRadius(cursorBorderRadiusCSS)
    incStatus()
  }

  const closeEyes = () => {
    setEyeAnimationCSS(eyeAnimation)
    incStatus()
  }

  const openEyes = () => {
    setEyeAnimationCSS('')
    incStatus()
  }

  const hideHat = () => {
    setShowGraduationHat(false)
    incStatus()
  }

  const stopSmiling = () => {
    setCursorBorderRadius('0')
    incStatus()
  }

  const startBlinking = () => {
    setCursorAnimationCSS(cursorAnimation)
    incStatus()
  }

  const removeSecondDLetter = () => {
    hideD()
    incStatus()
  }

  const addLetter = () => {
    if (dev.length < DEVELOPER_DAO.length) {
      addCharDev()
    } else {
      incStatus()
    }
  }

  const hideCursor = () => {
    setCursorBorder('0')
    incStatus()
  }

  const initialState = () => {
    if (autoStart) startAnimation()
  }

  const finalState = () => {
    if (loop) incStatus(2)
    else stopAnimation()
  }

  const funcs = [
    { func: initialState, delay: 0 },
    {
      func: showCursor,
      delay: clickToStart && !loop && !autoStart ? writeSpeed : STATIC_WAIT,
    },
    { func: startRemovingLettters, delay: CURSOR_WAIT },
    { func: removeLetter, delay: deleteSpeed },
    { func: stopBlinking, delay: writeSpeed },
    { func: showHat, delay: INTERVAL_WAIT },
    { func: startSmiling, delay: INTERVAL_WAIT },
    { func: closeEyes, delay: INTERVAL_WAIT },
    { func: openEyes, delay: CURSOR_WAIT },
    { func: hideHat, delay: INTERVAL_WAIT },
    { func: stopSmiling, delay: deleteSpeed },
    { func: startBlinking, delay: INTERVAL_WAIT },
    { func: removeSecondDLetter, delay: writeSpeed },
    { func: addLetter, delay: writeSpeed },
    { func: hideCursor, delay: INTERVAL_WAIT },
    { func: finalState, delay: 0 },
  ]

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    if (isAnimating) {
      setStatus(1) // Jump straight to first animation status
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    const { func, delay } = funcs[status % funcs.length]
    if (!delay) {
      func()
      return
    }

    logMessage(`Calling '${func.name}' in ${delay} ms`)
    const id = setTimeout(func, delay)
    return () => clearTimeout(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dev])

  const logoClicked = () => {
    logMessage(`Logo Clicked | click: ${clickToStart} | isAnim: ${isAnimating}`)
    if (clickToStart && !isAnimating) startAnimation()
  }

  return (
    <VStack align={'start'} my={0} py={0} spacing={0} onClick={logoClicked}>
      {showGraduationHat ? (
        <GraduationHat w="3.1em" h="1.55em" />
      ) : (
        <Box w="3.1em" h="1.55em"></Box>
      )}
      <HStack
        fontWeight={300}
        fontSize={`1.55rem`}
        lineHeight={`1.5rem`}
        // w="100%"
        spacing={0}
        my={0}
        py={0}
      >
        <Box
          bgClip={'text'}
          bgGradient={'linear(to-b, rgb(208,64,184), rgb(216,144,204))'}
          animation={eyeAnimationCSS}
        >
          {dev}
        </Box>
        <Box
          bgClip={'text'}
          bgGradient={'linear(to-b, rgb(208,64,184), rgb(216,144,204))'}
          animation={cursorAnimationCSS}
          w={4}
          h={6}
          lineHeight={8}
          borderBottom={cursorBorder}
          borderRadius={cursorBorderRadius}
        >
          &nbsp;
        </Box>
        <Box
          bgClip={'text'}
          bgGradient={'linear(to-b, rgb(208,64,184), rgb(216,144,204))'}
          animation={eyeAnimationCSS}
        >
          {dao}
        </Box>
      </HStack>
      <Box
        bgClip={'text'}
        bgGradient={'linear(to-b, rgb(216,144,204), rgb(224,224,224))'}
        fontWeight={800}
        fontSize={`1.3125rem`}
        lineHeight={`1.25rem`}
      >
        SCHOOL OF CODE
      </Box>
    </VStack>
  )
}

export default SchoolOfCodeLogo
