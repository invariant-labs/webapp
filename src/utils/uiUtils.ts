export const toBlur = 'global-blur'
export const addressTickerMap: { [key: string]: string } = {
  WETH: 'So11111111111111111111111111111111111111112',
  BTC: '3JXmQAzBPU66dkVQufSE1ChBMRAdCHp6T7ZMBKAwhmWw',
  USDC: '5W3bmyYDww6p5XRZnCR6m2c75st6XyCxW1TgGS3wTq7S',
  EBGR: 'EBGR1Nb8k3ihiwFuRvXXuxotSKbX7FQWwuzfJEVE9wx9',
  ETH: 'So11111111111111111111111111111111111111112',
  MOON: 'JChWwuoqpXZZn6WjSCssjaozj4u65qNgvGFsV6eJ2g8S',
  ECEGG: 'ECEGG4YDbBevPsq5KfL8Vyk6kptY1jhsoeaiG8RMXZ7C'
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

export const shortenAddress = (address: string, chars = 4) =>
  address.length > 8 ? `${address.slice(0, chars)}...${address.slice(-chars)}` : address

export const apyToApr = (apy: number) => {
  const dailyRate = Math.pow(1 + Math.abs(apy) / 100, 1 / 365) - 1
  return dailyRate * 365 * 100
}
