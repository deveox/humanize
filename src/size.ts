import { ByteUnit } from './index.d';

export function formatSize(bytes = 0, unit: ByteUnit = 'b') {
  const tick = 1024
  const units = ['b', 'kb', 'mb', 'gb', 'tb', 'ptb']
  const unitIdx = units.indexOf(unit)
  const availableUnits = units.slice(unitIdx)
  let u = availableUnits[0]
  for (let i = 0; i < availableUnits.length; i++) {
    u = availableUnits[i]
    if (bytes >= tick) {
      bytes = bytes / tick
    } else {
      break
    }
  }
  return `${Math.round(bytes * 100) / 100} ${u.toUpperCase()}`
}
