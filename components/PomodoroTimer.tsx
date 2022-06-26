import { useInterval } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { formatTime, minute, second } from '../lib/time'

export enum TimerStatus {
  Idle = 'idle',
  Studying = 'studying',
  StudyingPaused = 'studying-paused',
  StudyingComplete = 'studying-complete',
}

const Status = ({ children }: { children?: string }) => (
  <div aria-label="timer status">{children}</div>
)

const TimeRemaining = ({ time }: { time: number }) => (
  <time aria-label="time remaining">{formatTime(time)}</time>
)

export const PomodoroTimer = () => {
  const [status, setStatus] = useState(TimerStatus.Idle)
  const [timeRemaining, setTimeRemaining] = useState(25 * minute)
  const [isRunning, setIsRunning] = useState(false)

  const onStudy = () => {
    setStatus(TimerStatus.Studying)
    setIsRunning(true)
  }

  const onPause = () => {
    setStatus(TimerStatus.StudyingPaused)
    setIsRunning(false)
  }

  const onResume = () => {
    setStatus(TimerStatus.Studying)
    setIsRunning(true)
  }

  const onReset = () => {
    setStatus(TimerStatus.Idle)
    setTimeRemaining(25 * minute)
    setIsRunning(false)
  }

  const tick = () => {
    setTimeRemaining((timeRemaining) => {
      const remaining = timeRemaining - 1 * second
      return remaining < 0 ? 0 : remaining
    })
  }

  useInterval(tick, isRunning ? 1 * second : null)

  useEffect(() => {
    if (timeRemaining === 0) {
      setStatus(TimerStatus.StudyingComplete)
      setIsRunning(false)
    }
  }, [timeRemaining])

  switch (status) {
    case TimerStatus.Idle:
      return (
        <div>
          <Status />
          <TimeRemaining time={timeRemaining} />
          <button onClick={onStudy}>Study</button>
        </div>
      )
    case TimerStatus.Studying:
      return (
        <div>
          <Status>Studying</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={onPause}>Pause</button>
          <button onClick={onReset}>Reset</button>
        </div>
      )
    case TimerStatus.StudyingPaused:
      return (
        <div>
          <Status>Studying paused</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={onResume}>Resume</button>
          <button onClick={onReset}>Reset</button>
        </div>
      )
    case TimerStatus.StudyingComplete:
      return (
        <div>
          <Status>Studying complete</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={onResume}>Resume</button>
          <button onClick={onReset}>Reset</button>
        </div>
      )
    default:
      // throw if status is not handled, helpful for development
      const exhaustiveCheck: never = status
      throw new Error(`Unhandled status: ${exhaustiveCheck}`)
  }
}
