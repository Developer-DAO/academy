import { useInterval } from '@chakra-ui/react'
import { useReducer } from 'react'
import { formatTime, minute, second } from '../lib/time'

export interface TimerState {
  status: TimerStatus
  timeRemaining: number
  isRunning: boolean
}

export enum TimerStatus {
  Idle = 'idle',
  Studying = 'studying',
  StudyingPaused = 'studying-paused',
  StudyingComplete = 'studying-complete',
  Break = 'break',
  BreakComplete = 'break-complete',
}

export type TimerEvent =
  | 'break'
  | 'pause'
  | 'reset'
  | 'resume'
  | 'skip'
  | 'study'
  | 'tick'

const initialState: TimerState = {
  status: TimerStatus.Idle,
  timeRemaining: 25 * minute,
  isRunning: false,
}

const reducer = (state: TimerState, event: TimerEvent): TimerState => {
  switch (event) {
    case 'break':
      return {
        status: TimerStatus.Break,
        timeRemaining: 5 * minute,
        isRunning: true,
      }

    case 'pause':
      return {
        ...state,
        status: TimerStatus.StudyingPaused,
        isRunning: false,
      }

    case 'reset':
      return initialState

    case 'resume':
      return {
        ...state,
        status: TimerStatus.Studying,
        isRunning: true,
      }

    case 'skip':
      return initialState

    case 'study':
      return {
        status: TimerStatus.Studying,
        timeRemaining: 25 * minute,
        isRunning: true,
      }

    case 'tick':
      const remaining = state.timeRemaining - 1 * second
      const timeRemaining = remaining < 0 ? 0 : remaining

      if (timeRemaining !== 0) {
        return {
          ...state,
          timeRemaining,
        }
      }

      return {
        status:
          state.status === TimerStatus.Break
            ? TimerStatus.BreakComplete
            : TimerStatus.StudyingComplete,
        timeRemaining: 0,
        isRunning: false,
      }

    default:
      // throw if event is not handled, helpful for development
      const exhaustiveCheck: never = event
      throw new Error(`Unhandled event: ${exhaustiveCheck}`)
  }
}

const Status = ({ children }: { children?: string }) => (
  <div aria-label="timer status">{children}</div>
)

const TimeRemaining = ({ time }: { time: number }) => (
  <time aria-label="time remaining">{formatTime(time)}</time>
)

export const PomodoroTimer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isRunning, status, timeRemaining } = state

  useInterval(() => dispatch('tick'), isRunning ? 1 * second : null)

  switch (status) {
    case TimerStatus.Idle:
      return (
        <div>
          <Status />
          <TimeRemaining time={timeRemaining} />
          <button onClick={() => dispatch('study')}>Study</button>
        </div>
      )

    case TimerStatus.Studying:
      return (
        <div>
          <Status>Studying</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={() => dispatch('pause')}>Pause</button>
          <button onClick={() => dispatch('reset')}>Reset</button>
        </div>
      )

    case TimerStatus.StudyingPaused:
      return (
        <div>
          <Status>Studying paused</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={() => dispatch('resume')}>Resume</button>
          <button onClick={() => dispatch('reset')}>Reset</button>
        </div>
      )

    case TimerStatus.StudyingComplete:
      return (
        <div>
          <Status>Studying complete</Status>
          <TimeRemaining time={0} />
          <button onClick={() => dispatch('break')}>Break</button>
        </div>
      )

    case TimerStatus.Break:
      return (
        <div>
          <Status>On Break</Status>
          <TimeRemaining time={timeRemaining} />
          <button onClick={() => dispatch('skip')}>Skip</button>
        </div>
      )

    case TimerStatus.BreakComplete:
      return (
        <div>
          <Status>Break complete</Status>
          <TimeRemaining time={0} />
          <button onClick={() => dispatch('study')}>Study</button>
        </div>
      )

    default:
      // throw if status is not handled, helpful for development
      const exhaustiveCheck: never = status
      throw new Error(`Unhandled status: ${exhaustiveCheck}`)
  }
}
