import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export const isNonEmptyArray = (value: any): boolean => {
  return Array.isArray(value) && value.length > 0
}

export const isEmptyArray = (value: any): boolean => {
  return Array.isArray(value) && value.length === 0
}

export const isFunction = (input: any): boolean => typeof input === 'function'

export const getFirstItem = <T>(arr: T[]): T | null => {
  return arr.length > 0 ? arr[0] : null
}
