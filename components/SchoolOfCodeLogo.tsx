import {
  Box,
  HStack,
  Icon,
  VStack,
  keyframes,
  VisuallyHidden,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { type } from 'os'
import { useEffect, useRef, useState } from 'react'
// import Typewriter, { TypewriterClass } from 'typewriter-effect'

const DELETE_SPEED = 150
const WRITE_SPEED = 250

const DEVELOPER_DAO = 'DEVELOPER DAO'
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
}

const SchoolOfCodeLogo: NextPage<SchoolOfCodeLogoProps> = ({
  autoStart = false,
  loop = false,
  clickToStart = true,
  logToConsole = false,
  deleteSpeed = DELETE_SPEED,
  writeSpeed = WRITE_SPEED,
}) => {
  const INTERVAL_WAIT = 5 * DELETE_SPEED // 500
  const CURSOR_WAIT = 6 * WRITE_SPEED // 900
  const STATIC_WAIT = 5 * CURSOR_WAIT // 4500

  const cursorKeyframes = keyframes`
    0% { opacity: 1; }
   60% { opacity: 1; }
   61% { opacity: 0; }
   99% { opacity: 0; }
  100% { opacity: 1; }
  `
  const eyeKeyframes = keyframes`
    from {transform: scale(1,1);}
    to {transform: scale(1,0.1); top 80%;}
  `
  const cursorAnimation = `${cursorKeyframes} 1s infinite`
  const eyeAnimation = `${eyeKeyframes} ${
    CURSOR_WAIT / 4000
  }s infinite alternate`

  const [status, setStatus] = useState(0)
  const [dev, setDev] = useState(DEVELOPER_DAO)
  const [dao, setDao] = useState('')
  const [cursor, setCursor] = useState('')
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
    // TODO: Show Cursor
    setCursor('_')
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
    if (dev === 'DEVELOPER D') {
      delCharDev(2)
      showD()
      return
    }
    delCharDev()
  }

  const stopBlinking = () => {
    // TODO: Stop Blinking Cursor
    setCursorAnimationCSS('')
    incStatus()
  }

  const showHat = () => {
    // TODO: Show Hat Icon
    setShowGraduationHat(true)
    incStatus()
  }

  const startSmiling = () => {
    // TODO: Start Smile
    incStatus()
  }

  const closeEyes = () => {
    // TODO: Start Blinking Eyes
    setEyeAnimationCSS(eyeAnimation)
    incStatus()
  }

  const openEyes = () => {
    // TODO: Stop Blinking Eyes
    setEyeAnimationCSS('')
    incStatus()
  }

  const hideHat = () => {
    // TODO: Hide Hat
    setShowGraduationHat(false)
    incStatus()
  }

  const stopSmiling = () => {
    // TODO: Stop Smile
    incStatus()
  }

  const startBlinking = () => {
    // TODO: Start Blinking Cursor
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
    // TODO: Hide Cursor
    setCursor('')
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
    { func: showCursor, delay: clickToStart ? writeSpeed : STATIC_WAIT },
    { func: startRemovingLettters, delay: CURSOR_WAIT },
    { func: removeLetter, delay: deleteSpeed },
    { func: stopBlinking, delay: INTERVAL_WAIT },
    { func: showHat, delay: INTERVAL_WAIT },
    { func: startSmiling, delay: INTERVAL_WAIT },
    { func: closeEyes, delay: INTERVAL_WAIT },
    { func: openEyes, delay: CURSOR_WAIT },
    { func: hideHat, delay: INTERVAL_WAIT },
    { func: stopSmiling, delay: INTERVAL_WAIT },
    { func: startBlinking, delay: INTERVAL_WAIT },
    { func: removeSecondDLetter, delay: INTERVAL_WAIT },
    { func: addLetter, delay: writeSpeed },
    { func: hideCursor, delay: CURSOR_WAIT },
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
        <Icon w="20" h="12" viewBox="0 6 100 50" fill="none" stroke="white">
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
        M50 10L97 20L50 30L3 20z
        M50 20L12.5 22.5L12.5 40
        M25 25L25 45Q50 60 75 45L75 25
        M12.5 40L10 50C7.5 60 7.5 60 12.5 60C17.5 60 17.5 60 15 50z
        "
          />
        </Icon>
      ) : (
        <Box w="20" h="12"></Box>
      )}
      <HStack fontWeight={300} fontSize={40} w="100%" spacing={0} my={0} py={0}>
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
        >
          {cursor}
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
        fontWeight={700}
        fontSize={36}
      >
        SCHOOL OF CODE
      </Box>
    </VStack>
  )
}

export default SchoolOfCodeLogo
