import { useInterval } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { formatTime, minute, second } from '../lib/time'

export enum TimerStatus {
  Idle = 'idle',
  Studying = 'studying',
  StudyingPaused = 'studying-paused',
  StudyingComplete = 'studying-complete',
  Break = 'break',
  BreakComplete = 'break-complete',
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

  const onBreak = () => {
    setStatus(TimerStatus.Break)
    setTimeRemaining(5 * minute)
    setIsRunning(true)
  }

  const tick = () => {
    setTimeRemaining((timeRemaining) => {
      const remaining = timeRemaining - 1 * second
      return remaining < 0 ? 0 : remaining
    })
  }

  useInterval(tick, isRunning ? 1 * second : null)

  useEffect(() => {
    if (timeRemaining > 0) {
      return
    }

    if (status === TimerStatus.Studying) {
      setStatus(TimerStatus.StudyingComplete)
    }
    if (status === TimerStatus.Break) {
      setStatus(TimerStatus.BreakComplete)
    }
    setIsRunning(false)
  }, [timeRemaining, status])

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
          <TimeRemaining time={0} />
          <button onClick={onBreak}>Break</button>
        </div>
      )

    case TimerStatus.Break:
      return (
        <div>
          <Status>On Break</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={onReset}>Skip</button>
        </div>
      )

    case TimerStatus.BreakComplete:
      return (
        <div>
          <Status>Break complete</Status>
          <TimeRemaining time={0} />
          <button onClick={onStudy}>Study</button>
        </div>
      )

    default:
      // throw if status is not handled, helpful for development
      const exhaustiveCheck: never = status
      throw new Error(`Unhandled status: ${exhaustiveCheck}`)
  }
}
