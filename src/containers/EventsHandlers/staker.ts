import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { network, rpcAddress, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getStakerProgramSync } from '@web3/programs/staker'
import { Staker } from '@invariant-labs/staker-sdk'
import { IncentiveStructure, Stake } from '@invariant-labs/staker-sdk/lib/staker'
import { PublicKey } from '@solana/web3.js'
import { farms, userStakes } from '@selectors/farms'
import * as R from 'remeda'
import { actions } from '@reducers/farms'
import { status as walletStatus } from '@selectors/solanaWallet'
import { Status as WalletStatus } from '@reducers/solanaWallet'

const onIncentiveChange = async (
  stakerProgram: Staker,
  incentive: PublicKey,
  fn: (data: IncentiveStructure) => void
) => {
  stakerProgram.program.account.incentive
    .subscribe(incentive, 'singleGossip')
    .on('change', (data: IncentiveStructure) => {
      fn(data)
    })
}

const onStakeChange = async (
  stakerProgram: Staker,
  stake: PublicKey,
  fn: (data: Stake) => void
) => {
  stakerProgram.program.account.userStake
    .subscribe(stake, 'singleGossip')
    .on('change', (data: Stake) => {
      fn(data)
    })
}

const StakerEvents = () => {
  const dispatch = useDispatch()
  const networkType = useSelector(network)
  const rpc = useSelector(rpcAddress)
  const stakerProgram = getStakerProgramSync(networkType, rpc)
  const networkStatus = useSelector(status)
  const allFarms = useSelector(farms)
  const allUserStakes = useSelector(userStakes)
  const walletStat = useSelector(walletStatus)

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !stakerProgram) {
      return
    }

    const connectEvents = () => {
      R.forEachObj(allFarms, farm => {
        onIncentiveChange(stakerProgram, farm.address, farmData => {
          dispatch(
            actions.setSingleFarm({
              data: farmData,
              farm: farm.address
            })
          )
        })
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
      })
    }

    connectEvents()
  }, [dispatch, networkStatus, Object.values(farms).length])

  const [stakesKeys, setStakesKeys] = useState<string[]>([])

  useEffect(() => {
    if (
      networkStatus !== Status.Initialized ||
      !stakerProgram ||
      walletStat !== WalletStatus.Initialized
    ) {
      return
    }

    const connectEvents = () => {
      const tmpKeys = Object.keys(allUserStakes)

      stakesKeys.forEach(key => {
        if (!tmpKeys.includes(key)) {
          stakerProgram.program.account.userStake
            .unsubscribe(new PublicKey(key))
            .then(() => {})
            .catch(error => {
              console.log(error)
            })
        }
      })

      R.forEachObj(allUserStakes, stake => {
        if (tmpKeys.includes(stake.address.toString())) {
          return
        }

        onStakeChange(stakerProgram, stake.address, stakeData => {
          dispatch(
            actions.setSingleStake({
              ...stake,
              secondsPerLiquidityInitial: stakeData.secondsPerLiquidityInitial,
              liquidity: stakeData.liquidity
            })
          )
        })
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
      })

      setStakesKeys(tmpKeys)
    }

    connectEvents()
  }, [dispatch, networkStatus, walletStat, Object.values(allUserStakes).length])

  return null
}

export default StakerEvents
