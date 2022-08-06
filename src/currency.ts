export type Separators = {
  int: string
  decimal: string
  point: string
}
export type Precisions = {
  int: number
  decimal: number
}

export type Currency = string
export const ERR_INVALID_TYPE = '"num" has invalid type'
export const ERR_INTEGER_LIMIT = '"num" is greater then MAX_SAFE_INTEGER, consider using string or BigInt'
export const ERR_INVALID_STRING = '"num" is invalid string, valid pattern is "100.100" or "100,100"'

export function toCurrency(
  num: string | number | BigInt,
  currency: string = toCurrency.currency,
  precision: Precisions = toCurrency.precision,
  separators: Separators = toCurrency.separators
): Currency {
  let int = 0n
  let decimal = 0n
  let parts: [string, string] = ['', '']
  switch (typeof num) {
    case 'bigint':
      num = BigInt(num)
      break
    case 'number':
      if (num > Number.MAX_SAFE_INTEGER) {
        throw new Error(ERR_INTEGER_LIMIT)
      }
      num = String(num)
    case 'string':
      switch (true) {
        case /^\d+$/.test(num):
          parts[0] = num
        case /^\d+\.\d+$/.test(num):
          parts = num.split('.') as [string, string]
          break
        case /^\d+\,\d+$/.test(num):
          parts = num.split(',') as [string, string]
          break
        default:
          throw new Error(ERR_INVALID_STRING)
      }
      int = BigInt(parts[0])
      if (!parts[1]) parts[1] = '0'
      decimal = BigInt(parts[1])
      formatDecimal.initial = decimal
      break

    default:
      throw new Error(ERR_INVALID_TYPE)
  }
  if (decimal !== 0n) {
    decimal = roundInt(decimal, precision.decimal)
    if (precision.int !== 0) {
      if (decimal >= 5) {
        int += 1n
        decimal = 0n
      }
    }
  }
  int = roundInt(int, precision.int)
  return `${currency}${formatInt(int, separators.int)}${separators.point}${formatDecimal(
    decimal,
    separators.decimal,
    precision.decimal
  )}`
}
toCurrency.currency = '$'
toCurrency.precision = { int: 0, decimal: 2 }
toCurrency.separators = { int: '.', point: ',', decimal: ' ' }

export function roundInt(n: BigInt, precision: number) {
  let m = Array.from(n.toString(), s => Number(s))
  precision = precision >= 0 ? precision : m.length
  let counter = 0
  let summand = 0
  let i = m.length - 1
  for (; i >= 0; i--) {
    m[i] += summand
    if (m[i] >= 5) {
      summand = 1
    } else {
      summand = 0
    }
    if (counter >= precision - 1) {
      break
    } else {
      if (summand) {
        setPreviousZeros(m, i)
        m[i] = 0
      }
    }
    counter++
  }
  if (i > 0 && summand) {
    setPreviousZeros(m, i)
    m[i] = 0
  }
  return BigInt(m.join(''))
}

export function setPreviousZeros(nums: number[], idx: number) {
  for (let i = idx; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
}

export function formatInt(num: BigInt, separator: string) {
  return format(num.toString(), separator)
}
export function formatDecimal(num: BigInt, separator: string, precision: number) {
  let s = ''
  precision = precision >= 0 ? precision : formatDecimal.initial.toString().length
  if (num === 0n) {
    s = '0'.repeat(precision || 1)
  } else {
    s = num.toString()
  }
  return format(s, separator)
}
formatDecimal.initial = 0n

export function format(s: string, separator: string) {
  let arr = Array.from(s)
  let buffer = []
  let counter = 1
  for (let i = arr.length - 1; i >= 0; i--) {
    buffer.push(arr[i])
    if (counter % 3 === 0 && i !== 0) {
      buffer.push(separator)
    }
    counter++
  }
  return buffer.reverse().join('').trim()
}

// export function fromCurrency(value: Currency): BigInt {
//   return 0n
// }
