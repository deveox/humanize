export type ByteUnit = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'ptb'


export const ERR_NEGATIVE = 'bytes should be positive number'
export const ERR_INVALID_UNIT = 'second argument is not valid unit'
const tick = BigInt(1024)
const units = ['b', 'kb', 'mb', 'gb', 'tb', 'ptb']

export function formatSize(bytes = 0, unit: ByteUnit = 'b') {
  if (bytes < 0) throw new Error(ERR_NEGATIVE)
  if (!units.includes(unit)) throw new Error(ERR_INVALID_UNIT)
  let b = BigInt(Math.round(bytes))
  const unitIdx = units.indexOf(unit)
  const biggerUnits = units.slice(unitIdx)
  let u = biggerUnits[0]
  for (let i = 0; i < biggerUnits.length; i++) {
    u = biggerUnits[i]
    if (b >= tick) {
      b = b / tick
    } else {
      break
    }
  }
  return `${Math.round(Number(b) * 100) / 100} ${u.toUpperCase()}`
}
