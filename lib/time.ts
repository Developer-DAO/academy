export const millisecond = 1

export const second = millisecond * 1000

export const minute = second * 60

/**
 * Converts milliseconds into the 'HH:MM' format
 *
 * @example
 * formatTime(1 * second) // '00:01'
 * formatTime(59 * second) // '00:59'
 * formatTime(1 * minute) // '01:00'
 * formatTime(1 * minute + 1 * second) // '01:01'
 * formatTime(10 * minute) // '10:00'
 * formatTime(10 * minute + 1 * second) // '10:01'
 */
export function formatTime(ms: number) {
  const minutes = Math.floor(ms / minute)
  const seconds = Math.floor((ms % minute) / second)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}
