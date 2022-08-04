export type ByteUnit = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'ptb'
export type DateFormat = 'period' | 'time' | 'time-period' | 'date' | 'date-period' | 'day' | 'min' | 'date-time'
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