export type NumberFormatType = 'word' | 'name' | 'symbol'
export type IntSymbols = 'Y' | 'Z' | 'E' | 'P' | 'T' | 'G' | 'M' | 'k' | 'h' | 'da'
export type FloatSymbols = 'd' | 'c' | 'm' | 'μ' | 'n' | 'p' | 'f' | 'a' | 'z' | 'y'
export type NumberFormatOptions = {
  exponent: number
  name: string
  word: string
}

export type IntPrefixes = {
  [key in IntSymbols as string]: NumberFormatOptions
}
export type FloatPrefixes = {
  [key in FloatSymbols as string]: NumberFormatOptions
}
export type NumberPrefixes = IntPrefixes | FloatPrefixes

export const intPrefixes: IntPrefixes = {
  Y: { exponent: 24, word: 'septillion', name: 'yotta' },
  Z: { exponent: 21, word: 'sextillion', name: 'zetta' },
  E: { exponent: 18, word: 'quintillion', name: 'exa' },
  P: { exponent: 15, word: 'quadrillion', name: 'peta' },
  T: { exponent: 12, word: 'trillion', name: 'tera' },
  G: { exponent: 9, word: 'billion', name: 'giga' },
  M: { exponent: 6, word: 'million', name: 'mega' },
  k: { exponent: 3, word: 'thousand', name: 'kilo' },
  h: { exponent: 2, word: 'hundred', name: 'hecto' },
  da: { exponent: 1, word: 'ten', name: 'deco' },
}

export const floatPrefixes: FloatPrefixes = {
  d: { exponent: -1, word: 'tenth', name: 'deci' },
  c: { exponent: -2, word: 'hundredth', name: 'centi' },
  m: { exponent: -3, word: 'thousandth', name: 'milli' },
  μ: { exponent: -6, word: 'millionth', name: 'micro' },
  n: { exponent: -9, word: 'billionth', name: 'nano' },
  p: { exponent: -12, word: 'trillionth', name: 'pico' },
  f: { exponent: -15, word: 'quadrillionth', name: 'femto' },
  a: { exponent: -18, word: 'quintillionth', name: 'atto' },
  z: { exponent: -21, word: 'sextillionth', name: 'zepto' },
  y: { exponent: -24, word: 'septillionth', name: 'yocto' }
}

export function formatInt(
  num: number | string | bigint,
  depth: number = 1,
  type: NumberFormatType = 'symbol',
  prefixes: IntPrefixes = intPrefixes
) {
  let n = toNumber(num)
  let isNegative = false
  if (n < 0) {
    isNegative = true
    n = n < 0n ? -n : n
  }

  return isNegative ? '-' + _formatInt(n, depth, type, prefixes) : _formatInt(n, depth, type, prefixes)
}

// TODO
// export function formatFloat(
//   num: number | string,
//   depth: number = 1,
//   type: NumberFormatType = 'symbol',
//   prefixes: FloatPrefixes = floatPrefixes
// ) {
//   let n = toNumber(num)
//   return formatInt(n, depth, type, prefixes)
// }

export function _formatInt(n: bigint, depth: number, f: NumberFormatType, p: IntPrefixes) {
  if (n >= 1 && n < 10) {
    return String(n)
  }
  let res = ''
  p = { ...p }
  for (let i = 0; i < depth; i++) {
    for (const k in p) {
      const level = BigInt(10) ** BigInt(p[k].exponent)
      if (n >= level) {
        const left = n % level
        const rounded = n / level
        res += `${getString(Number(rounded), f, k, p)} `
        if (left) {
          n = left
        } else {
          n = BigInt(0)
        }
        delete p[k]
        break
      }
    }
    if (!res) break
  }
  if (n) {
    String(n).split("").forEach((e, i) => {
      res += e
      if ((i + 1) % 3 === 0) {
        res += " "
      }
    })
  }
  return res.trimEnd()
}

export function getString(n: number, f: NumberFormatType, k: string, p: NumberPrefixes) {
  switch (f) {
    case 'word':
      return pluralize(n, p[k].word)
    case 'name':
      return `${n} ${p[k].name}`
  }
  return `${n} ${k}`
}

export function toNumber(n: number | string | bigint) {
  switch (typeof n) {
    case 'bigint':
      return n
    case 'number':
      return BigInt(n)
    case 'string':
      return BigInt(Number.parseFloat(n))
    default:
      throw new Error(`invalid type provided`)
  }
}

export function pluralize(n: number, s: string) {
  if (n === 1) return `${n} ${s}`
  return `${n} ${s}s`
}
