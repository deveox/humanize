import { ByteUnit, ERR_INVALID_UNIT, ERR_NEGATIVE } from './../src/size';
import { formatSize } from '../src/size'

describe('formatSize', () => {
  it('should return proper value for different units', () => {
    expect(formatSize(1024)).toEqual('1 KB')
    expect(formatSize(1024, 'kb')).toEqual('1 MB')
    expect(formatSize(1024, 'mb')).toEqual('1 GB')
    expect(formatSize(1024, 'gb')).toEqual('1 TB')
    expect(formatSize(1024, 'tb')).toEqual('1 PTB')
  })
  it('should return proper value with no args', () => {
    expect(formatSize()).toEqual('0 B')
  })
  it('should throw an error if first arg is negative', () => {
    expect(() => formatSize(-1024)).toThrow(ERR_NEGATIVE)
  })
  it('should throw an error if second arg is not valid unit', () => {
    expect(() => formatSize(0, 'bb' as ByteUnit)).toThrow(ERR_INVALID_UNIT)
  })
  it('checking big values', () => {
    expect(formatSize()).toEqual('1 PTB')
  })
})