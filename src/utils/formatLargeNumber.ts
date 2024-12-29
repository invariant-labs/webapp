import { trimZeros } from './utils'

export const formatLargeNumber = (number: number) => {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q']

  if (number < 1000) {
    return number.toFixed(1)
  }

  const suffixIndex = Math.floor(Math.log10(number) / 3)
  const scaledNumber = number / Math.pow(1000, suffixIndex)

  return `${trimZeros(scaledNumber.toFixed(1))}${suffixes[suffixIndex]}`
}
