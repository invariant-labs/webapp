import { BN } from '@project-serum/anchor'

export const toBlur = 'global-blur'

export const addressTickerMap: { [key: string]: string } = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  USDH: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
  mSOL: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
  bSOL: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
  stSOL: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
  SNY: '4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y',
  ETH: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
  LFNTY: 'LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp'
}

export const reversedAddressTickerMap = Object.fromEntries(
  Object.entries(addressTickerMap).map(([key, value]) => [value, key])
)

// could use rewriting to backdrop-filter when browser support is better
export const blurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'blur(4px) brightness(0.4)'
}
export const unblurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'none'
}

const addPxToValue = ['fontSize'] // add more css properties when needed

export const importantStyles = (styleObject: { [key: string]: string | number }) =>
  Object.entries(styleObject).reduce(
    (obj, [key, value]) => ({
      ...obj,
      [key]: `${value}${addPxToValue.some(prop => prop === key) ? 'px' : ''} !important`
    }),
    styleObject
  )

export const parseFeeToPathFee = (fee: BN): string => {
  const parsedFee = (fee / Math.pow(10, 8)).toString().padStart(3, '0')
  return parsedFee.slice(0, parsedFee.length - 2) + '_' + parsedFee.slice(parsedFee.length - 2)
}

export const parsePathFeeToFeeString = (pathFee: string): string => {
  return (+pathFee.replace('_', '') * Math.pow(10, 8)).toString()
}

export const tickerToAddress = (ticker: string): string => {
  return addressTickerMap[ticker] || ticker
}

export const addressToTicker = (address: string): string => {
  return reversedAddressTickerMap[address] || address
}
