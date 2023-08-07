/* eslint-disable @typescript-eslint/restrict-plus-operands */
import SelectedFarmList from '@components/FarmsList/SelectedFarmList/SelectedFarmList'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import {
  farms,
  howManyPositionsForFarm,
  isLoadingFarms,
  isLoadingFarmsApy,
  isLoadingFarmsTotals,
  isLoadingNewRangeTicks,
  isLoadingStakesApy,
  isLoadingUserStakes,
  positionsForFarm,
  singleFarmData,
  stakeRangeTicks,
  stakeStatuses,
  userStakes
} from '@selectors/farms'
import { tokens } from '@selectors/pools'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@reducers/farms'
import { Status } from '@reducers/solanaWallet'
import { status } from '@selectors/solanaWallet'
import {
  calculateReward,
  calculateSecondsPerLiquidityInside
} from '@invariant-labs/staker-sdk/lib/utils'
import { BN } from '@project-serum/anchor'
import loader from '@static/gif/loader.gif'
import { positionsList } from '@selectors/positions'
import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import { openWalletSelectorModal } from '@web3/selector'

export interface IProps {
  id: string
}

const SingleFarmWrapper: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const allTokens = useSelector(tokens)
  const farmData = useSelector(singleFarmData(id))
  const farmPositions = useSelector(positionsForFarm(id))
  const allStakeStatuses = useSelector(stakeStatuses)
  const allFarms = useSelector(farms)
  const allUserStakes = useSelector(userStakes)
  const walletStatus = useSelector(status)
  const farmsLoading = useSelector(isLoadingFarms)
  const stakesLoading = useSelector(isLoadingUserStakes)
  const { list } = useSelector(positionsList)
  const farmsTotalsLoading = useSelector(isLoadingFarmsTotals)
  const farmPositionsLength = useSelector(howManyPositionsForFarm(id))
  const allStakeRangeTicks = useSelector(stakeRangeTicks)
  const rangeTicksLoading = useSelector(isLoadingNewRangeTicks)
  const farmApyLoading = useSelector(isLoadingFarmsApy)
  const stakesApyLoading = useSelector(isLoadingStakesApy)

  useEffect(() => {
    if (Object.values(allTokens).length > 0 && Object.values(allFarms).length === 0) {
      dispatch(actions.getFarms())
    }
  }, [Object.values(allTokens).length])

  useEffect(() => {
    if (
      walletStatus === Status.Initialized &&
      Object.values(allFarms).length > 0 &&
      Object.values(allUserStakes).length === 0 &&
      list.length > 0
    ) {
      dispatch(actions.getUserStakes())
    }
  }, [walletStatus, Object.values(allFarms).length, list])

  const [rangeTicksFetched, setRangeTicksFetched] = useState<boolean | null>(null)

  useEffect(() => {
    if (rangeTicksFetched === null && rangeTicksLoading) {
      setRangeTicksFetched(false)
    } else if (rangeTicksFetched === false && !rangeTicksLoading) {
      setRangeTicksFetched(true)
    }
  }, [rangeTicksLoading])

  useEffect(() => {
    const stakeAddresses: string[] = []
    farmPositions.forEach(({ stakeAddress }) => {
      if (typeof stakeAddress !== 'undefined') {
        stakeAddresses.push(stakeAddress.toString())
      }
    })
    if (stakeAddresses.length > 0 && !rangeTicksFetched) {
      dispatch(actions.getNewStakeRangeTicks(stakeAddresses))
    }
  }, [Object.values(allUserStakes).length])

  const currentPrice =
    typeof farmData === 'undefined'
      ? 0
      : calcYPerXPrice(
          farmData.poolData.sqrtPrice.v,
          allTokens[farmData.poolData.tokenX.toString()].decimals,
          allTokens[farmData.poolData.tokenY.toString()].decimals
        )

  const toStake = useMemo(() => {
    if (typeof farmData === 'undefined') {
      return []
    }

    return farmPositions
      .filter(position => typeof position.stakeAddress === 'undefined')
      .map(position => {
        const lowerPrice = calcYPerXPrice(
          calculatePriceSqrt(position.lowerTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
        const upperPrice = calcYPerXPrice(
          calculatePriceSqrt(position.upperTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const minPrice = Math.min(lowerPrice, upperPrice)
        const maxPrice = Math.max(lowerPrice, upperPrice)

        let tokenXDeposit, tokenYDeposit

        try {
          tokenXDeposit = +printBN(
            getX(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenX.decimals
          )
        } catch (error) {
          tokenXDeposit = 0
        }

        try {
          tokenYDeposit = +printBN(
            getY(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenY.decimals
          )
        } catch (error) {
          tokenYDeposit = 0
        }

        const currentPrice = calcYPerXPrice(
          position.poolData.sqrtPrice.v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const valueX = currentPrice === 0 ? 0 : tokenXDeposit + tokenYDeposit / currentPrice
        const valueY = tokenYDeposit + tokenXDeposit * currentPrice

        const now = Date.now() / 1000

        return {
          tokenXSymbol: position.tokenX.symbol,
          tokenYSymbol: position.tokenY.symbol,
          tokenXDecimals: position.tokenX.decimals,
          tokenYDecimals: position.tokenY.decimals,
          minPrice,
          maxPrice,
          tokenXDeposit,
          tokenYDeposit,
          valueX,
          valueY,
          stakeStatus: allStakeStatuses[position.id.toString() + '_' + position.pool.toString()],
          isActive: now >= farmData.startTime.v.toNumber() && now <= farmData.endTime.v.toNumber(),
          onStake: () => {
            dispatch(
              actions.stakePosition({
                farm: farmData.address,
                pool: position.pool,
                id: position.id
              })
            )
          }
        }
      })
  }, [farmPositions, allStakeStatuses])
  const stakedPositions = useMemo(() => {
    if (typeof farmData === 'undefined') {
      return []
    }

    return farmPositions
      .filter(position => typeof position.stakeAddress !== 'undefined')
      .map(position => {
        const lowerPrice = calcYPerXPrice(
          calculatePriceSqrt(position.lowerTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
        const upperPrice = calcYPerXPrice(
          calculatePriceSqrt(position.upperTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const minPrice = Math.min(lowerPrice, upperPrice)
        const maxPrice = Math.max(lowerPrice, upperPrice)

        let tokenXDeposit, tokenYDeposit

        try {
          tokenXDeposit = +printBN(
            getX(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenX.decimals
          )
        } catch (error) {
          tokenXDeposit = 0
        }

        try {
          tokenYDeposit = +printBN(
            getY(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenY.decimals
          )
        } catch (error) {
          tokenYDeposit = 0
        }

        const currentPrice = calcYPerXPrice(
          position.poolData.sqrtPrice.v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const valueX = tokenXDeposit + tokenYDeposit / currentPrice
        const valueY = tokenYDeposit + tokenXDeposit * currentPrice

        let rewardValue = 0
        let apy = 0
        let dailyReward = 0

        if (typeof position.stakeAddress !== 'undefined') {
          apy = allUserStakes[position.stakeAddress.toString()].apy ?? 0
          dailyReward = allUserStakes[position.stakeAddress.toString()].dailyReward ?? 0

          let secondsPerLiquidityInside = position.secondsPerLiquidityInside

          if (typeof allStakeRangeTicks[position.stakeAddress.toString()] !== 'undefined') {
            const rangeTicks = allStakeRangeTicks[position.stakeAddress.toString()]

            if (
              typeof rangeTicks.lowerTick !== 'undefined' &&
              typeof rangeTicks.upperTick !== 'undefined'
            ) {
              secondsPerLiquidityInside = {
                v: calculateSecondsPerLiquidityInside({
                  tickLower: rangeTicks.lowerTick,
                  tickUpper: rangeTicks.upperTick,
                  pool: position.poolData,
                  currentTimestamp: new BN(Math.floor(Date.now() / 1000))
                })
              }
            }
          }

          const { result } = calculateReward({
            totalRewardUnclaimed: farmData.totalRewardUnclaimed.v,
            totalSecondsClaimed: farmData.totalSecondsClaimed.v,
            startTime: farmData.startTime.v,
            endTime: farmData.endTime.v,
            liquidity: allUserStakes[position.stakeAddress.toString()].liquidity,
            currentTime: new BN(Date.now() / 1000),
            secondsPerLiquidityInsideInitial:
              allUserStakes[position.stakeAddress.toString()].secondsPerLiquidityInitial,
            secondsPerLiquidityInside: secondsPerLiquidityInside
          })

          rewardValue = +printBN(result, allTokens[farmData.rewardToken.toString()].decimals)

          if (rewardValue < 0) {
            rewardValue = 0
          }
        }

        return {
          apy,
          dailyReward,
          tokenXSymbol: position.tokenX.symbol,
          tokenYSymbol: position.tokenY.symbol,
          tokenXDecimals: position.tokenX.decimals,
          tokenYDecimals: position.tokenY.decimals,
          minPrice,
          maxPrice,
          tokenXDeposit,
          tokenYDeposit,
          valueX,
          valueY,
          rewardSymbol: allTokens[farmData.rewardToken.toString()].symbol,
          rewardIcon: allTokens[farmData.rewardToken.toString()].logoURI,
          rewardDecimals: allTokens[farmData.rewardToken.toString()].decimals,
          rewardValue,
          onClaimReward: () => {
            dispatch(
              actions.withdrawRewardsForPosition({
                farm: farmData.address,
                pool: position.pool,
                id: position.id
              })
            )
          }
        }
      })
  }, [farmPositions, allStakeRangeTicks])

  const userStakedInXToken = useMemo(() => {
    let sum = 0

    stakedPositions.forEach(({ valueX }) => {
      sum += valueX
    })

    return sum
  }, [stakedPositions])

  const userStakedInYToken = useMemo(() => {
    let sum = 0

    stakedPositions.forEach(({ valueY }) => {
      sum += valueY
    })

    return sum
  }, [stakedPositions])

  return !farmData ? (
    farmsLoading ? (
      <img src={loader} style={{ width: 150, height: 150, margin: 'auto' }} />
    ) : (
      <EmptyPlaceholder desc='Farm does not exist' style={{ marginBlock: 20 }} />
    )
  ) : (
    <SelectedFarmList
      tokenX={allTokens[farmData.poolData.tokenX.toString()]}
      tokenY={allTokens[farmData.poolData.tokenY.toString()]}
      rewardToken={allTokens[farmData.rewardToken.toString()]}
      duration={`${new Date(farmData.startTime.v.toNumber() * 1000).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
      })}-${new Date(farmData.endTime.v.toNumber() * 1000).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
      })}`}
      totalStakedInXToken={
        (farmData.totalStakedX ?? 0) + (farmData.totalStakedY ?? 0) / currentPrice
      }
      totalStakedInYToken={
        (farmData.totalStakedY ?? 0) + (farmData.totalStakedX ?? 0) * currentPrice
      }
      userStakedInXToken={userStakedInXToken}
      userStakedInYToken={userStakedInYToken}
      fee={+printBN(farmData.poolData.fee.v, DECIMAL - 2)}
      averageApy={(farmData.averageApy ?? 0) + farmData.poolApy}
      singleTickApy={(farmData.singleTickApy ?? 0) + farmData.poolApy}
      toStake={toStake}
      stakedPositions={stakedPositions}
      stakesLoading={stakesLoading && farmPositionsLength > 0}
      walletConnected={walletStatus === Status.Initialized}
      isLoadingTotals={farmsTotalsLoading}
      totalPositions={farmPositionsLength}
      noConnectedBlockerProps={{
        onConnect: openWalletSelectorModal
      }}
      isLoadingRangeTicks={!rangeTicksFetched}
      isLoadingStakesApy={stakesApyLoading}
      isLoadingFarmApy={farmApyLoading}
    />
  )
}

export default SingleFarmWrapper
