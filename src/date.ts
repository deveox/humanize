
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
export type DateFormat = 'period' | 'time' | 'time-period' | 'date' | 'date-period' | 'day' | 'min' | 'date-time'

dayjs.extend(relativeTime)


export function formatDate(date?: string | number, format: DateFormat = 'date-time') {
  if (!date) return 'never'
  const d = typeof date === 'number' ? new Date(date * 1000) : new Date(date)
  const djs = dayjs(d)
  const year = djs.year()
  if (year < 1800) {
    return 'centuries ago'
  }
  let res
  switch (format) {
    case 'period':
      res = djs.fromNow()
      break
    case 'date':
      res = djs.format('L')
      break
    case 'date-period':
      res = `${djs.format('L')} (${djs.fromNow()})`
      break
    case 'time-period':
      res = `${djs.format('L HH:mm:ss')} (${djs.fromNow()})`
      break
    case 'day':
      res = djs.format('MMM DD')
      break
    case 'min':
      res = djs.format('L HH:mm')
      break
    case 'time':
      res = `${djs.format('HH:mm:ss')}`
      break
    default:
      res = djs.format('L HH:mm:ss')
  }
  return res === 'Invalid date' ? '--' : res
}