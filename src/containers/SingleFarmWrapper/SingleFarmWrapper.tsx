import SelectedFarmList from '@components/FarmsList/SelectedFarmList/SelectedFarmList'
import { positionsForFarm, singleFarmData } from '@selectors/farms'
import { tokens } from '@selectors/pools'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export interface IProps {
  id: string
}

const SingleFarmWrapper: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const allTokens = useSelector(tokens)
  const farmData = useSelector(singleFarmData(id))
  const farmPositions = useSelector(positionsForFarm(id))

  return !farmData ? null : (
    <SelectedFarmList
      tokenXIcon={allTokens[farmData.poolData.tokenX.toString()].logoURI}
      tokenYIcon={allTokens[farmData.poolData.tokenY.toString()].logoURI}
      tokenXSymbol={allTokens[farmData.poolData.tokenX.toString()].symbol}
      tokenYSymbol={allTokens[farmData.poolData.tokenY.toString()].symbol}
      rewardIcon={allTokens[farmData.rewardToken.toString()].logoURI}
      rewardSymbol={allTokens[farmData.rewardToken.toString()].symbol}
      duration=''
      totalStaked={0}
      userStaked={0}
      totalRewardPerDay={0}
      apy={0}
      toStake={[]}
      stakedPositions={[]}
    />
  )
}

export default SingleFarmWrapper
