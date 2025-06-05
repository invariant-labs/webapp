import { BN } from '@project-serum/anchor'
import { printBN, trimDecimalZeros } from './utils'
import { PublicKey } from '@solana/web3.js'
import { SwapToken } from '@store/selectors/solanaWallet'
import { Intervals, MONTH_NAMES } from '@store/consts/static'

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

interface MaxButtonConfig {
  tokens: Record<string, SwapToken>
  wrappedTokenAddress: string
  minAmount: BN
  onAmountSet: (value: string) => void
  onSelectInput?: () => void
}

export const createButtonActions = (config: MaxButtonConfig) => {
  const calculateAmount = (tokenIndex: string) => {
    const token = config.tokens[tokenIndex]
    const isWrappedToken = token.assetAddress.equals(new PublicKey(config.wrappedTokenAddress))

    return isWrappedToken
      ? token.balance.gt(config.minAmount)
        ? token.balance.sub(config.minAmount)
        : new BN(0)
      : token.balance
  }

  return {
    max: (tokenIndex?: string) => {
      if (tokenIndex === undefined) {
        return
      }

      config.onSelectInput?.()
      const amount = calculateAmount(tokenIndex)
      config.onAmountSet(trimDecimalZeros(printBN(amount, config.tokens[tokenIndex].decimals)))
    },

    half: (tokenIndex?: string) => {
      if (tokenIndex === undefined) {
        return
      }

      config.onSelectInput?.()
      const fullAmount = calculateAmount(tokenIndex)
      const halfAmount = fullAmount.div(new BN(2))
      config.onAmountSet(trimDecimalZeros(printBN(halfAmount, config.tokens[tokenIndex].decimals)))
    }
  }
}
type ButtonVariant = {
  label: string
  className: string
}

type GetButtonClassNameParams = {
  label: string
  variants: ButtonVariant[]
  default: string
}

export const getButtonClassName = ({
  label,
  variants,
  default: defaultClass
}: GetButtonClassNameParams): string => {
  const variant = variants.find(v => v.label.toLowerCase() === label.toLowerCase())
  return `${defaultClass}  ${variant?.className}`
}

export const mapIntervalToPrecision = (interval: Intervals): string => {
  switch (interval) {
    case Intervals.Daily:
      return 'every 1 day'
    case Intervals.Weekly:
      return 'every 1 week'
    case Intervals.Monthly:
      return 'every 1 month'
    case Intervals.Yearly:
      return 'every 1 year'
  }
}

export const mapIntervalToString = (interval: Intervals): string => {
  switch (interval) {
    case Intervals.Daily:
      return '1D'
    case Intervals.Weekly:
      return '1W'
    case Intervals.Monthly:
      return '1M'
    case Intervals.Yearly:
      return '1Y'
  }
}
export const formatPlotDataLabels = (
  time: number,
  entries: number,
  interval: Intervals,
  isMobile: boolean = false
): string => {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  switch (interval) {
    case Intervals.Monthly: {
      const monthName = MONTH_NAMES[month - 1].slice(0, 3)
      const monthMod = month % 3
      if (monthMod !== 0) return ''
      return monthName + ' ' + year.toString().slice(-2) + "'"
    }
    case Intervals.Daily: {
      const dayMod =
        Math.floor(time / (1000 * 60 * 60 * 24)) % (entries >= 8 ? (isMobile ? 4 : 3) : 1)
      return dayMod === 0 ? `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}` : ''
    }
    case Intervals.Weekly: {
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() + mondayOffset)

      const weekNumber = Math.floor(weekStart.getTime() / (1000 * 60 * 60 * 24 * 7))
      const weekMod = weekNumber % (entries >= 8 ? (isMobile ? 4 : 2) : 1)

      if (weekMod !== 0) return ''

      const startDay = weekStart.getDate()
      const startMonth = weekStart.getMonth() + 1
      return `${startDay < 10 ? '0' : ''}${startDay}/${startMonth < 10 ? '0' : ''}${startMonth}`
    }
    case Intervals.Yearly: {
      return year.toString()
    }
  }
}

export const getLabelDate = (
  interval: Intervals,
  timestamp: number,
  latestTimestamp: number
): string => {
  const date = new Date(timestamp)
  const now = new Date(latestTimestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const monthName = MONTH_NAMES[month - 1].slice(0, 3)

  const formatDay = (d: number) => `${d < 10 ? '0' : ''}${d}`

  if (interval === Intervals.Daily) {
    return `${day < 10 ? '0' : ''}${day} ${monthName}`
  } else if (interval === Intervals.Weekly) {
    // Calculate start of week (Monday-based)
    const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() + mondayOffset)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStartDate = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate()
    )
    const weekEndDate = new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate())

    if (weekStartDate <= todayStart && todayStart <= weekEndDate) {
      weekEnd.setTime(now.getTime())
    }

    const startDay = weekStart.getDate()
    const startMonth = weekStart.getMonth()
    const startMonthName = MONTH_NAMES[startMonth].slice(0, 3)

    const endDay = weekEnd.getDate()
    const endMonth = weekEnd.getMonth()
    const endMonthName = MONTH_NAMES[endMonth].slice(0, 3)

    if (startMonth === endMonth && startDay === endDay) {
      return `${formatDay(startDay)} ${startMonthName}`
    } else {
      return `${formatDay(startDay)} ${startMonthName} - ${formatDay(endDay)} ${endMonthName}`
    }
  } else if (interval === Intervals.Monthly) {
    const monthEnd = new Date(year, date.getMonth() + 1, 0)

    if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      monthEnd.setTime(now.getTime())
      const startDay = 1
      const endDay = monthEnd.getDate()
      if (startDay === endDay) {
        return `${formatDay(startDay)} ${monthName}`
      }

      return `${formatDay(startDay)} ${monthName} - ${formatDay(endDay)} ${monthName}`
    } else {
      return MONTH_NAMES[month - 1] + ' ' + year
    }
  } else if (interval === Intervals.Yearly) {
    return year.toString()
  }

  return `${day < 10 ? '0' : ''}${day} ${monthName}`
}
