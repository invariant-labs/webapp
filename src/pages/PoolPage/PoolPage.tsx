import React, { useEffect } from 'react'
import NewPositionWrapper from '@containers/newDesign/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import useStyles from './styles'
import { Status } from '@reducers/solanaConnection'
import { Status as WalletStatus } from '@reducers/solanaWallet'
import solanaConnectionSelector from '@selectors/solanaConnection'
import { status } from '@selectors/solanaWallet'

export const PoolPage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const walletStatus = useSelector(status)

  useEffect(() => {
    if (signerStatus === Status.Initialized && walletStatus === WalletStatus.Initialized) {
      dispatch(actions.getPositionList())
    }
  }, [signerStatus, walletStatus])

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper />
      </Grid>
    </Grid>
  )
}
