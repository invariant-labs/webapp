import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { printBN, getTokenPrice } from '@utils/utils'
import { useEffect, useState } from 'react'

interface Token {
  assetAddress: PublicKey
  balance: BN
  tokenProgram?: PublicKey
  symbol: string
  address: PublicKey
  decimals: number
  name: string
  logoURI: string
  coingeckoId?: string
  isUnknown?: boolean
}

interface ProcessedPool {
  id: PublicKey
  symbol: string
  icon: string
  value: number
  isUnknown?: boolean
  decimal: number
  amount: number
}

export const useProcessedTokens = (tokensList: Token[], isBalanceLoading: boolean) => {
  const [processedPools, setProcessedPools] = useState<ProcessedPool[]>([])
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
            const priceData = await getTokenPrice(token.assetAddress.toString() ?? '')
            price = priceData.price ?? 0
          } catch (error) {
            console.error(`Failed to fetch price for ${token.symbol}:`, error)
          }
          return {
            id: token.address,
            symbol: token.symbol,
            icon: token.logoURI,
            isUnknown: token.isUnknown,
            decimal: token.decimals,
            amount: balance,
            value: balance * price
          }
        })
      )

      setProcessedPools(processed)
      setIsProcesing(false)
    }
    if (isBalanceLoading) return
    if (tokensList?.length) {
      processTokens()
    }
  }, [tokensList, isBalanceLoading])

  return { processedPools, isProcesing }
}
