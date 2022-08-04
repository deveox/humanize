export type ByteUnit = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'ptb'


export const ERR_NEGATIVE = 'bytes should be positive number'
export const ERR_INVALID_UNIT = 'second argument is not valid unit'
const tick = 1024
const units = ['b', 'kb', 'mb', 'gb', 'tb', 'ptb']

export function formatSize(bytes = 0, unit: ByteUnit = 'b') {
  if (bytes < 0) throw new Error(ERR_NEGATIVE)
  if (!units.includes(unit)) throw new Error(ERR_INVALID_UNIT)
  const unitIdx = units.indexOf(unit)
  const biggerUnits = units.slice(unitIdx)
  let u = biggerUnits[0]
  for (let i = 0; i < biggerUnits.length; i++) {
    u = biggerUnits[i]
    if (bytes >= tick) {
      bytes = bytes / tick
    } else {
      break
    }
  }
  return `${Math.round(bytes * 100) / 100} ${u.toUpperCase()}`
}
