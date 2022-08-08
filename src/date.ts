import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
export type DateFormat = 'period' | 'time' | 'time-period' | 'date' | 'date-period' | 'day' | 'min' | 'date-time'

export const ERR_INVALID_FORMAT = 'second argument is not valid format'
dayjs.extend(relativeTime)
const formats = ['period', 'time', 'time-period', 'date', 'date-period', 'day', 'min', 'date-time']

export function formatDate(date?: string | number | Date, format: DateFormat = 'date-time') {
  if (!date) return 'never'
  if (!formats.includes(format)) throw new Error(ERR_INVALID_FORMAT)
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
      res = djs.format('DD/MM/YYYY')
      break
    case 'date-period':
      res = `${djs.format('DD/MM/YYYY')} (${djs.fromNow()})`
      break
    case 'time-period':
      res = `${djs.format('DD/MM/YYYY HH:mm:ss')} (${djs.fromNow()})`
      break
    case 'day':
      res = djs.format('MMM DD')
      break
    case 'min':
      res = djs.format('DD/MM/YYYY HH:mm')
      break
    case 'time':
      res = `${djs.format('HH:mm:ss')}`
      break
    default:
      res = djs.format('DD/MM/YYYY HH:mm:ss')
  }
  return res === 'Invalid date' ? '--' : res
}
