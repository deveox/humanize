import { floatPrefixes, formatInt, getString, intPrefixes, NumberFormatType, pluralize, toNumber, _formatInt } from '../src/numbers'

describe('pluralize', () => {
  it('should return plural form if n !== 1', () => {
    expect(pluralize(2, 'word')).toEqual('2 words')
    expect(pluralize(0, 'word')).toEqual('0 words')
    expect(pluralize(-2, 'word')).toEqual('-2 words')
  })
  it('should return singular form if n === 1', () => {
    expect(pluralize(1, 'word')).toEqual('1 word')
  })
})

describe('toNumber', () => {
  it('should return number if number is provided', () => {
    expect(toNumber(2)).toStrictEqual(2n)
  })
  it('should return number if string is provided', () => {
    expect(toNumber('2')).toStrictEqual(2n)
  })
  it('should return number if bigint is provided', () => {
    expect(toNumber(2n)).toStrictEqual(2n)
  })
  it('should throw error if neither number or string was provided', () => {
    expect(() => toNumber({} as string)).toThrow('invalid type provided')
  })
})

describe('getString', () => {
  const prefixes = { ...intPrefixes, ...floatPrefixes }
  it('should return proper value if type is `word`', () => {
    for (const k in prefixes) {
      expect(getString(1, 'word', k, prefixes)).toStrictEqual(`1 ${prefixes[k].word}`)
    }
  })
  it('should return proper value if type is `name`', () => {
    for (const k in prefixes) {
      expect(getString(1, 'name', k, prefixes)).toStrictEqual(`1 ${prefixes[k].name}`)
    }
  })
  it('should return proper value if type is `symbol`', () => {
    for (const k in prefixes) {
      expect(getString(1, 'symbol', k, prefixes)).toStrictEqual(`1 ${k}`)
    }
  })
  it('should return proper value if type is not set', () => {
    for (const k in prefixes) {
      expect(getString(1, '' as NumberFormatType, k, prefixes)).toStrictEqual(`1 ${k}`)

    }
  })
})

function testFormat(fn: typeof _formatInt | typeof formatInt) {
  it('should return proper values with big values', () => {
    expect(fn(444222111999100234123456789n, 10, 'word', intPrefixes)).toEqual("444 septillions 222 sextillions 111 quintillions 999 quadrillions 100 trillions 234 billions 123 millions 456 thousands 7 hundreds 8 tens 9")

  })
  it('should return proper values when depth = 0', () => {
    expect(fn(444222111999100234123456789n, 0, 'word', intPrefixes)).toEqual("444 222 111 999 100 234 123 456 789")
  })
  it('should return proper values when depth = 1', () => {
    expect(fn(123456789n, 1, 'word', intPrefixes)).toEqual("123 millions 456 789")
  })
  it('should return proper values when depth > 100', () => {
    expect(fn(123456789n, 100, 'word', intPrefixes)).toEqual("123 millions 456 thousands 7 hundreds 8 tens 9")
  })
  it('should process last zeros', () => {
    expect(fn(1000000000n, 100, 'word', intPrefixes)).toEqual("1 billion")
  })
}

describe('_formatInt', () => {
  testFormat(_formatInt)
})

describe('formatInt', () => {
  testFormat(formatInt)
  it('should return proper value when number value provided', () => {
    expect(formatInt(240, 10, 'word', intPrefixes)).toEqual("2 hundreds 4 tens")
  })
  it('should return proper value when string value provided', () => {
    expect(formatInt("240", 10, 'word', intPrefixes)).toEqual("2 hundreds 4 tens")
  })
  it('should return proper value when negative value provided', () => {
    expect(formatInt(-240, 10, 'word', intPrefixes)).toEqual("-2 hundreds 4 tens")
  })

})
