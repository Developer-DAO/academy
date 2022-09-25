import { formatTime, minute, second } from './time'

test('formatTime', () => {
  expect(formatTime(1 * second)).toEqual('00:01')
  expect(formatTime(59 * second)).toEqual('00:59')
  expect(formatTime(1 * minute)).toEqual('01:00')
  expect(formatTime(1 * minute + 1 * second)).toEqual('01:01')
  expect(formatTime(10 * minute)).toEqual('10:00')
  expect(formatTime(10 * minute + 1 * second)).toEqual('10:01')
})
