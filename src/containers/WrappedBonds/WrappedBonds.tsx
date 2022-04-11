import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/bonds'
import { status } from '@selectors/solanaWallet'
import loader from '@static/gif/loader.gif'
import useStyles from './styles'
import { Status } from '@reducers/solanaWallet'
import { bondsList, isLoadingBondsList, isLoadingUserVested, userVested } from '@selectors/bonds'

export const WrappedBonds: React.FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const walletStatus = useSelector(status)
  const bondsListLoading = useSelector(isLoadingBondsList)
  const allBonds = useSelector(bondsList)
  const userVestedLoading = useSelector(isLoadingUserVested)
  const allUserVested = useSelector(userVested)

  useEffect(() => {
    dispatch(actions.getBondsList())
  }, [])

  useEffect(() => {
    if (walletStatus === Status.Initialized) {
      dispatch(actions.getUserVested())
    }
  }, [walletStatus])

  return (
    <Grid container className={classes.wrapper} direction='column'>
      {bondsListLoading ? <img src={loader} className={classes.loading} /> : <></>}
    </Grid>
  )
}

export default WrappedBonds
