import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getStakerProgramSync } from '@web3/programs/staker'
import { Staker } from '@invariant-labs/staker-sdk'
import { IncentiveStructure } from '@invariant-labs/staker-sdk/lib/staker'
import { PublicKey } from '@solana/web3.js'
import { farms } from '@selectors/farms'
import * as R from 'remeda'
import { actions } from '@reducers/farms'

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

const StakerEvents = () => {
  const dispatch = useDispatch()
  const stakerProgram = getStakerProgramSync()
  const networkStatus = useSelector(status)
  const allFarms = useSelector(farms)

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
  return null
}

export default StakerEvents
