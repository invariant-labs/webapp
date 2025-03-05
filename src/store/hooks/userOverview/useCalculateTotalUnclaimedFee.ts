import { useEffect, useRef, useCallback, Dispatch } from 'react'
import { UnknownAction } from 'redux'
import { actions } from '@store/reducers/positions'

const useCalculateTotalUnclaimedFee = (
  prices: Record<
    string,
    {
      price: number
      buyPrice: number
      sellPrice: number
    }
  >,
  dispatch: Dispatch<UnknownAction>
) => {
  const prevPricesRef = useRef({})
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const calculateFees = useCallback(() => {
    dispatch(actions.calculateTotalUnclaimedFees())
  }, [dispatch, actions])

  useEffect(() => {
    const hasPricesChanged =
      Object.keys(prices).length > 0 &&
      JSON.stringify(prevPricesRef.current) !== JSON.stringify(prices)

    if (hasPricesChanged) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      calculateFees()

      intervalRef.current = setInterval(calculateFees, 60000)

      prevPricesRef.current = prices

      // Cleanup function
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [prices, calculateFees])
}

export default useCalculateTotalUnclaimedFee
