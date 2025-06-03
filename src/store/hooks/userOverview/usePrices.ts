import { getTokenPrice } from '@utils/utils'
import { useState, useEffect } from 'react'
import { network } from '@store/selectors/solanaConnection'
import { useSelector } from 'react-redux'

interface TokenPriceData {
  price: number
  loading: boolean
}

export const usePrices = ({
  tokenX,
  tokenY
}: {
  tokenY: { assetsAddress?: string; name?: string; coingeckoId?: string }
  tokenX: { assetsAddress?: string; name?: string; coingeckoId?: string }
}) => {
  const networkType = useSelector(network)

  const [tokenXPriceData, setTokenXPriceData] = useState<TokenPriceData>({
    price: 0,
    loading: true
  })
  const [tokenYPriceData, setTokenYPriceData] = useState<TokenPriceData>({
    price: 0,
    loading: true
  })
  useEffect(() => {
    if (!tokenX || !tokenY) return

    const fetchPrices = async () => {
      getTokenPrice(tokenX.assetsAddress ?? '', tokenX.coingeckoId)
        .then(price => {
          setTokenXPriceData({ price: price.price ?? 0, loading: false })
        })
        .catch(() => {
          setTokenXPriceData({
            price: 0,
            loading: false
          })
        })

      getTokenPrice(tokenY.assetsAddress ?? '', tokenY.coingeckoId)
        .then(price => setTokenYPriceData({ price: price.price ?? 0, loading: false }))
        .catch(() => {
          setTokenYPriceData({
            price: 0,
            loading: false
          })
        })
    }

    fetchPrices()
  }, [tokenX.assetsAddress, tokenY.assetsAddress, networkType])
  return { tokenXPriceData, tokenYPriceData }
}
