// import { toCurrency, ERR_INVALID_TYPE, ERR_INTEGER_LIMIT, ERR_INVALID_STRING, roundInt } from '../src/currency'
import {
  ERR_INTEGER_LIMIT,
  ERR_INVALID_STRING,
  ERR_INVALID_TYPE,
  formatDecimal,
  formatInt,
  roundInt,
  toCurrency
} from '../src/currency'

function testFormat(fn: (n: BigInt, s: string, ...args: any[]) => string) {
  it('should return proper value', () => {
    expect(fn(1000n, ' ', 0)).toEqual('1 000')
    expect(fn(10000n, ' ', 0)).toEqual('10 000')
    expect(fn(100000n, ' ', 0)).toEqual('100 000')
    expect(fn(1000000n, ' ', 0)).toEqual('1 000 000')
  })
}

describe('formatInt', () => {
  it('should return proper value for zeros', () => {
    expect(formatInt(0n, ' ')).toEqual('0')
  })
  testFormat(formatInt)
})

describe('formatDecimal', () => {
  it('should return proper value for zeros', () => {
    expect(formatDecimal(0n, ' ', -1)).toEqual('0')
    expect(formatDecimal(0n, ' ', 0)).toEqual('0')
    expect(formatDecimal(0n, ' ', 1)).toEqual('0')
    expect(formatDecimal(0n, ' ', 2)).toEqual('00')
    expect(formatDecimal(0n, ' ', 3)).toEqual('000')
    expect(formatDecimal(0n, ' ', 4)).toEqual('0 000')
    expect(formatDecimal(0n, ' ', 5)).toEqual('00 000')
    expect(formatDecimal(0n, ' ', 6)).toEqual('000 000')
    expect(formatDecimal(0n, ' ', 7)).toEqual('0 000 000')
  })
  testFormat(formatDecimal)
})

describe('roundInt', () => {
  it('should return proper value for different values', () => {
    expect(roundInt(445n, 3)).toEqual(500n)
    expect(roundInt(9945n, 2)).toEqual(9900n)
    expect(roundInt(99454n, 3)).toEqual(99000n)
    expect(roundInt(190000000000453n, 15)).toEqual(200000000000000n)
    expect(roundInt(190000000000453n, 0)).toEqual(190000000000453n)
  })
  it('should return proper value with negative precision', () => {
    expect(roundInt(190000000000453n, -1)).toEqual(200000000000000n)
  })
})

describe('toCurrency', () => {
  it('should return proper value for all types of first arg', () => {
    expect(toCurrency('100000')).toEqual('$100.000,00')
    expect(toCurrency('1000.00')).toEqual('$1.000,00')
    expect(toCurrency('1000,00')).toEqual('$1.000,00')
    expect(toCurrency('100')).toEqual('$100,00')
    expect(toCurrency(100000)).toEqual('$100.000,00')
    expect(toCurrency(100000.01)).toEqual('$100.000,01')
    expect(toCurrency(100000n)).toEqual('$100.000,00')
    // expect(toCurrency(Number.MAX_SAFE_INTEGER)).toEqual('$100,000,000,000,000,000,000.00')
  })
  it('should return proper value for different currencies', () => {
    expect(toCurrency('100000', '€')).toEqual('€100,000.00')
  })
  it('should return proper value for different precisions', () => {
    expect(toCurrency('100000', '€', { int: 2, decimal: 2 })).toEqual('€100,000.000')
    expect(toCurrency('100000', '€', { int: 0, decimal: 0 })).toEqual('€100,000')
  })
  it('should return proper value for different separators', () => {
    expect(toCurrency('100000', '€', { int: 3, decimal: 4 }, { int: '/', decimal: '*', point: '.' })).toEqual(
      '€100/000.0*000'
    )
  })
  it('should throw an error if first arg has invalid type', () => {
    expect(() => toCurrency({} as unknown as string)).toThrow(ERR_INVALID_TYPE)
  })
  it('should throw an error if first arg has invalid value', () => {
    expect(() => toCurrency(Number.MAX_SAFE_INTEGER + 10)).toThrow(ERR_INTEGER_LIMIT)
    expect(() => toCurrency('abc.abc')).toThrow(ERR_INVALID_STRING)
    expect(() => toCurrency('abc,abc')).toThrow(ERR_INVALID_STRING)
    expect(() => toCurrency('100.100.100')).toThrow(ERR_INVALID_STRING)
    expect(() => toCurrency('100,100,100')).toThrow(ERR_INVALID_STRING)
  })
  it('should return proper value for negative values', () => {
    expect(toCurrency('-100000')).toEqual('-$100,000.00')
  })
  it('should return proper value for fractional values', () => {
    expect(toCurrency('100000.01')).toEqual('$100,000.01')
    expect(toCurrency('100000,01')).toEqual('$100,000.01')
  })
})
