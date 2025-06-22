import { PublicKey } from '@solana/web3.js'
import { SwapToken } from '@store/selectors/solanaWallet'
import { printBN, getTokenPrice, ensureError } from '@utils/utils'
import { useEffect, useState } from 'react'

interface ProcessedToken {
  id: PublicKey
  symbol: string
  icon: string
  value: number
  isUnknown?: boolean
  decimal: number
  amount: number
}

export const useProcessedTokens = (tokensList: SwapToken[], isBalanceLoading: boolean) => {
  const [processedTokens, setProcessedTokens] = useState<ProcessedToken[]>([])
  const [isProcesing, setIsProcesing] = useState<boolean>(true)

  useEffect(() => {
    const processTokens = async () => {
      const nonZeroTokens = tokensList.filter(token => {
        const balance = printBN(token.balance, token.decimals)
        return parseFloat(balance) > 0
      })

      const processed = await Promise.all(
        nonZeroTokens.map(async token => {
          const balance = Number(printBN(token.balance, token.decimals).replace(',', '.'))

          let price = 0
          try {
            const priceData = await getTokenPrice(
              token.assetAddress.toString() ?? '',
              token.coingeckoId
            )
            price = priceData.price ?? 0
          } catch (e: unknown) {
            const error = ensureError(e)
            console.error(`Failed to fetch price for ${token.symbol}:`, error)
          }

          return {
            id: token.assetAddress,
            symbol: token.symbol,
            icon: token.logoURI,
            isUnknown: token.isUnknown,
            decimal: token.decimals,
            amount: balance,
            value: balance * price
          }
        })
      )

      setProcessedTokens(processed)
      setIsProcesing(false)
    }
    if (isBalanceLoading) return
    if (tokensList?.length) {
      processTokens()
    }
  }, [tokensList, isBalanceLoading])

  return { processedTokens, isProcesing }
}
