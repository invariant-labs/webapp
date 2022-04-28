import SelectedFarmList from '@components/FarmsList/SelectedFarmList/SelectedFarmList'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import {
  farms,
  isLoadingFarms,
  isLoadingFarmsTotals,
  isLoadingUserStakes,
  positionsForFarm,
  singleFarmData,
  stakeStatuses,
  userStakes
} from '@selectors/farms'
import { tokens } from '@selectors/pools'
import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@reducers/farms'
import { Status } from '@reducers/solanaWallet'
import { status } from '@selectors/solanaWallet'
import { calculateReward } from '@invariant-labs/staker-sdk/lib/utils'
import { BN } from '@project-serum/anchor'
import loader from '@static/gif/loader.gif'
import { positionsList } from '@selectors/positions'
import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'

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
          fee: +printBN(position.poolData.fee.v, DECIMAL - 2),
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

        if (typeof position.stakeAddress !== 'undefined') {
          const { result } = calculateReward({
            totalRewardUnclaimed: farmData.totalRewardUnclaimed.v,
            totalSecondsClaimed: farmData.totalSecondsClaimed.v,
            startTime: farmData.startTime.v,
            endTime: farmData.endTime.v,
            liquidity: allUserStakes[position.stakeAddress.toString()].liquidity,
            currentTime: new BN(Date.now() / 1000),
            secondsPerLiquidityInsideInitial:
              allUserStakes[position.stakeAddress.toString()].secondsPerLiquidityInitial,
            secondsPerLiquidityInside: position.secondsPerLiquidityInside
          })

          rewardValue = +printBN(result, allTokens[farmData.rewardToken.toString()].decimals)
        }

        return {
          tokenXSymbol: position.tokenX.symbol,
          tokenYSymbol: position.tokenY.symbol,
          tokenXDecimals: position.tokenX.decimals,
          tokenYDecimals: position.tokenY.decimals,
          fee: +printBN(position.poolData.fee.v, DECIMAL - 2),
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
  }, [farmPositions])

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
        (farmData.totalStakedY ?? 0) + (farmData.totalStakedX ?? 0) / currentPrice
      }
      userStakedInXToken={userStakedInXToken}
      userStakedInYToken={userStakedInYToken}
      totalRewardPerDay={0}
      apy={0}
      toStake={toStake}
      stakedPositions={stakedPositions}
      stakesLoading={stakesLoading}
      walletConnected={walletStatus === Status.Initialized}
      isLoadingTotals={farmsTotalsLoading}
    />
  )
}

export default SingleFarmWrapper
