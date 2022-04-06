import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getStakerProgramSync } from '@web3/programs/staker'

const StakerEvents = () => {
  const dispatch = useDispatch()
  const stakerProgram = getStakerProgramSync()
  const networkStatus = useSelector(status)

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !stakerProgram) {
      return
    }

    const connectEvents = () => {
    }

    connectEvents()
  }, [dispatch, networkStatus])
  return null
}

export default StakerEvents
