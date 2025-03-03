import { calculatePercentageRatio } from '@components/PositionsList/PositionItem/utils/calculations'
import { printBN } from '@utils/utils'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { useLiquidity } from '../userOverview/useLiquidity'
import { usePositionTicks } from '../userOverview/usePositionTicks'
import { usePrices } from '../userOverview/usePrices'
import { IPositionItem } from '@components/PositionsList/types'
import { network as currentNetwork, rpcAddress } from '@store/selectors/solanaConnection'
import { getSolanaWallet } from '@utils/web3/wallet'
import { useSelector } from 'react-redux'
import { ISinglePositionData } from '@components/OverviewYourPositions/components/Overview/Overview'
import { IWallet } from '@invariant-labs/sdk'
import { Tick } from '@invariant-labs/sdk/lib/market'
import { calculateClaimAmount } from '@invariant-labs/sdk/lib/utils'
import { BN } from '@project-serum/anchor'

const UPDATE_INTERVAL = 60000

interface PositionTicks {
  lowerTick: Tick | undefined
  upperTick: Tick | undefined
  loading: boolean
}

interface UnclaimedFeeHook extends IPositionItem {
  positionSingleData?: ISinglePositionData
  xToY: boolean
}

export const useUnclaimedFee = ({
  currentPrice,
  id,
  position,
  tokenXLiq,
  tokenYLiq,
  positionSingleData,
  xToY
}: Pick<
  UnclaimedFeeHook,
  'currentPrice' | 'id' | 'position' | 'tokenXLiq' | 'tokenYLiq' | 'positionSingleData' | 'xToY'
>) => {
  const wallet = useMemo(() => getSolanaWallet(), [])
  const networkType = useSelector(currentNetwork)
  const rpc = useSelector(rpcAddress)

  const lastUpdateTimeRef = useRef<number>(0)
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [previousUnclaimedFees, setPreviousUnclaimedFees] = useState<number>(0)
  const [previousTokenValueInUsd, setPreviousTokenValueInUsd] = useState<number>(0)

  const [positionTicks, setPositionTicks] = useState<PositionTicks>({
    lowerTick: undefined,
    upperTick: undefined,
    loading: false
  })

  const { tokenXPercentage, tokenYPercentage } = useMemo(
    () => calculatePercentageRatio(tokenXLiq, tokenYLiq, currentPrice, xToY),
    [tokenXLiq, tokenYLiq, currentPrice, xToY]
  )

  const { tokenXLiquidity, tokenYLiquidity } = useLiquidity(positionSingleData)

  const { tokenXPriceData, tokenYPriceData } = usePrices({
    tokenX: {
      assetsAddress: positionSingleData?.tokenX.assetAddress.toString(),
      name: positionSingleData?.tokenX.name
    },
    tokenY: {
      assetsAddress: positionSingleData?.tokenY.assetAddress.toString(),
      name: positionSingleData?.tokenY.name
    }
  })

  const checkShouldUpdate = useCallback(() => {
    const currentTime = Date.now()
    if (isInitialLoad || currentTime - lastUpdateTimeRef.current >= UPDATE_INTERVAL) {
      lastUpdateTimeRef.current = currentTime
      return true
    }
    return false
  }, [isInitialLoad])

  useEffect(() => {
    if (checkShouldUpdate()) {
      setShouldUpdate(true)
    }

    const interval = setInterval(() => {
      if (checkShouldUpdate()) {
        setShouldUpdate(true)
      }
    }, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [checkShouldUpdate])

  const {
    lowerTick,
    upperTick,
    loading: ticksLoading
  } = usePositionTicks({
    positionId: id,
    poolData: positionSingleData?.poolData,
    lowerTickIndex: positionSingleData?.lowerTickIndex ?? 0,
    upperTickIndex: positionSingleData?.upperTickIndex ?? 0,
    networkType,
    rpc,
    wallet: wallet as IWallet,
    shouldUpdate
  })

  useEffect(() => {
    if (lowerTick && upperTick) {
      setPositionTicks({
        lowerTick,
        upperTick,
        loading: ticksLoading
      })

      if (!ticksLoading) {
        setShouldUpdate(false)
        setIsInitialLoad(false)
      }
    }
  }, [lowerTick, upperTick, ticksLoading])

  const calculateUnclaimedFees = useCallback(() => {
    if (
      !positionSingleData?.poolData ||
      typeof positionTicks.lowerTick === 'undefined' ||
      typeof positionTicks.upperTick === 'undefined'
    ) {
      return null
    }
    const [bnX, bnY] = calculateClaimAmount({
      position,
      tickLower: positionTicks.lowerTick,
      tickUpper: positionTicks.upperTick,
      tickCurrent: positionSingleData.poolData.currentTickIndex,
      feeGrowthGlobalX: positionSingleData.poolData.feeGrowthGlobalX,
      feeGrowthGlobalY: positionSingleData.poolData.feeGrowthGlobalY
    })

    // console.log('uncilaimed: ', bnX, bnY)

    return {
      xAmount: +printBN(bnX, positionSingleData.tokenX.decimals),
      yAmount: +printBN(bnY, positionSingleData.tokenY.decimals)
    }
  }, [position, positionTicks, positionSingleData])

  const unclaimedFeesInUSD = useMemo(() => {
    const loading =
      positionTicks.loading ||
      !positionSingleData?.poolData ||
      tokenXPriceData.loading ||
      tokenYPriceData.loading ||
      typeof positionTicks.lowerTick === 'undefined' ||
      typeof positionTicks.upperTick === 'undefined'

    if (loading && !isInitialLoad && previousUnclaimedFees > 0) {
      return { loading: false, value: previousUnclaimedFees }
    }

    if (loading) {
      return { loading: true, value: previousUnclaimedFees }
    }

    const fees = calculateUnclaimedFees()
    if (!fees) {
      return { loading: true, value: previousUnclaimedFees }
    }

    const totalValueInUSD =
      fees.xAmount * tokenXPriceData.price + fees.yAmount * tokenYPriceData.price
    console.log(fees)

    console.log(tokenXPriceData, tokenYPriceData)
    console.log('TOTAL:', totalValueInUSD)

    if (Math.abs(totalValueInUSD - previousUnclaimedFees) > 0.000001) {
      setPreviousUnclaimedFees(totalValueInUSD)
    }

    return { loading: false, value: totalValueInUSD }
  }, [
    positionTicks,
    positionSingleData,
    tokenXPriceData,
    tokenYPriceData,
    previousUnclaimedFees,
    isInitialLoad,
    calculateUnclaimedFees
  ])

  const tokenValueInUsd = useMemo(() => {
    const loading = tokenXPriceData.loading || tokenYPriceData.loading

    if (loading && !isInitialLoad && previousTokenValueInUsd > 0) {
      return { loading: false, value: previousTokenValueInUsd }
    }

    if (loading) {
      return { loading: true, value: previousTokenValueInUsd }
    }

    if (!tokenXLiquidity && !tokenYLiquidity) {
      return { loading: false, value: 0 }
    }

    const totalValue =
      tokenXLiquidity * tokenXPriceData.price + tokenYLiquidity * tokenYPriceData.price

    if (Math.abs(totalValue - previousTokenValueInUsd) > 0.000001) {
      setPreviousTokenValueInUsd(totalValue)
    }

    return { loading: false, value: totalValue }
  }, [
    tokenXLiquidity,
    tokenYLiquidity,
    tokenXPriceData,
    tokenYPriceData,
    previousTokenValueInUsd,
    isInitialLoad
  ])

  return { tokenValueInUsd, unclaimedFeesInUSD, tokenXPercentage, tokenYPercentage }
}
