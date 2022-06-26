import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { minute, second } from '../lib/time'
import { PomodoroTimer } from './PomodoroTimer'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('timer starts in the idle state', () => {
  render(<PomodoroTimer />)

  expect(screen.getByLabelText('timer status')).toHaveTextContent('')
  expect(
    screen.getByLabelText('time remaining', { selector: 'time' }),
  ).toHaveTextContent('25:00')
})

test('study session', async () => {
  const user = userEvent.setup()
  render(<PomodoroTimer />)

  const timerStatus = screen.getByLabelText('timer status')
  const timeRemaining = screen.getByLabelText('time remaining')

  // click the Study button
  user.click(screen.getByRole('button', { name: 'Study' }))

  // wait for Studying state
  await waitFor(() => expect(timerStatus).toHaveTextContent('Studying'))

  // study session timer begins at 25:00
  expect(timeRemaining).toHaveTextContent('25:00')

  // timer starts immediately
  await act(() => {
    jest.advanceTimersByTime(5 * minute)
  })
  await waitFor(() => expect(timeRemaining).toHaveTextContent('20:00'))

  // active study session timer can be paused
  user.click(screen.getByRole('button', { name: 'Pause' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent('Studying paused'))

  // validate that timer doesn't decrement while paused
  await act(() => {
    jest.advanceTimersByTime(5 * second)
  })
  await waitFor(() => expect(timeRemaining).toHaveTextContent('20:00'))

  // paused study session timer can be reset back to idle state
  user.click(screen.getByRole('button', { name: 'Reset' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent(''))
  expect(timeRemaining).toHaveTextContent('25:00')

  // paused study session timer can be resumed
  user.click(screen.getByRole('button', { name: 'Study' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent('Studying'))
  user.click(screen.getByRole('button', { name: 'Pause' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent('Studying paused'))
  user.click(screen.getByRole('button', { name: 'Resume' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent(/^Studying$/))

  // validate that timer is running again
  await act(() => {
    jest.advanceTimersByTime(5 * minute)
  })
  await waitFor(() => expect(timeRemaining).toHaveTextContent('20:00'))

  // active study session timer can be reset back to idle state
  user.click(screen.getByRole('button', { name: 'Reset' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent(''))
  expect(timeRemaining).toHaveTextContent('25:00')

  // return to Studying state
  user.click(screen.getByRole('button', { name: 'Study' }))
  await waitFor(() => expect(timerStatus).toHaveTextContent('Studying'))

  // active study session timer counts down to 00:00
  await act(() => {
    jest.advanceTimersByTime(25 * minute)
  })
  await waitFor(() =>
    expect(timerStatus).toHaveTextContent('Studying complete'),
  )
  expect(timeRemaining).toHaveTextContent('00:00')

  // TODO: empty study session timer can begin a break session
})
