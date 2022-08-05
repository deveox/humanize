import { DateFormat, ERR_INVALID_FORMAT, formatDate } from '../src/date'


describe('formatDate', () => {
  it('should throw an error if second arg is not valid format', () => {
    expect(() => formatDate('1995-12-17', 'days' as DateFormat)).toThrow(ERR_INVALID_FORMAT)
  })
  it('should return proper value with no parameters', () => {
    expect(formatDate()).toEqual('never')
  })
  it('should return proper value for different formats', () => {
    expect(formatDate('1995-12-17', 'period')).toEqual('27 years ago')
    expect(formatDate('December', 'period')).toEqual('27 years ago')
    expect(formatDate('1995-12-17', 'date')).toEqual('L')
    expect(formatDate('1995-12-17', 'date-period')).toEqual('L (27 years ago)')
    expect(formatDate('1995-12-17T03:24:00', 'time-period')).toEqual('L 03:24:00 (27 years ago)')
    expect(formatDate('1995-12-17', 'day')).toEqual('Dec 17')
    expect(formatDate('1995-12-17T03:24:00', 'min')).toEqual('L 03:24')
    expect(formatDate('1995-12-17T03:24:00', 'time')).toEqual('03:24:00')
  })
  it('should return proper value for date less then 1800 year', () => {
    expect(formatDate('1795-12-17', 'day')).toEqual('centuries ago')
  })
  it('should return a message for invalid date', () => {
    expect(formatDate('date', 'time')).toEqual('Invalid Date')
  })
})