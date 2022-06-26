import { render, screen } from '@testing-library/react'
import { PomodoroTimer } from './PomodoroTimer'

test('timer starts in the idle state', () => {
  render(<PomodoroTimer />)

  expect(screen.getByLabelText('timer status')).toHaveTextContent('')
  expect(
    screen.getByLabelText('time remaining', { selector: 'time' }),
  ).toHaveTextContent('25:00')
})
