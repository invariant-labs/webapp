import React, { useEffect, useMemo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/bonds'
import { status } from '@selectors/solanaWallet'
import loader from '@static/gif/loader.gif'
import { Status } from '@reducers/solanaWallet'
import { bondsList, isLoadingBondsList, userVested } from '@selectors/bonds'
import BondList from '@components/Bonds/BondList/BondList'
import PositionsList from '@components/Bonds/UserList/PositionsList/PositionsList'
import { tokens } from '@selectors/pools'
import useStyles from './styles'
import { BN } from '@project-serum/anchor'

export const WrappedBonds: React.FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const walletStatus = useSelector(status)
  const bondsListLoading = useSelector(isLoadingBondsList)
  const allBonds = useSelector(bondsList)
  const allUserVested = useSelector(userVested)
  const allTokens = useSelector(tokens)

  useEffect(() => {
    dispatch(actions.getBondsList())
  }, [])

  useEffect(() => {
    if (walletStatus === Status.Initialized) {
      dispatch(actions.getUserVested())
    }
  }, [walletStatus])

  const bondsData = useMemo(() => {
    return Array(4)
      .fill({})
      .map(() => {
        return {
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          secondIcon:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          symbol: 'xSOL',
          secondSymbol: 'xBTC',
          decimals: 2,
          price: 12235,
          roiPercent: '13.34',
          purchased: '100,434.44',
          vesting: '10'
        }
      })
  }, [allBonds, allTokens])

  const userVestedData = useMemo(() => {
    return Array(2)
      .fill({})
      .map(() => {
        return {
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimals: 2,
          value: new BN(1354),
          symbol: 'xBTC',
          secondIcon:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          secondValue: new BN(1590),
          secondSymbol: 'xSOL',
          redeemable: new BN(8553),
          vestPeriod: '1/3'
        }
      })
  }, [allUserVested, allTokens])

  return (
    <Grid container className={classes.wrapper} direction='column'>
      {bondsListLoading ? (
        <img src={loader} className={classes.loading} />
      ) : (
        <>
          <Typography className={classes.header}>Bonds</Typography>
          <Typography className={classes.desc}>
            Thanks to bonds mechanism, you can obtain newly introduced tokens at low price. There
            are various vesting options you can choose to filter available bonds and find the
            desired one. In the bottom part you can see how many tokens you are eligible to withdraw
            and how much time is left that you can claim the remaining part.
          </Typography>
          <BondList data={bondsData} />
          {walletStatus === Status.Initialized && userVestedData.length > 0 ? (
            <>
              <Typography className={classes.header} style={{ marginTop: 16 }}>Your vested positions</Typography>
              <PositionsList data={userVestedData} />
            </>
          ) : null}
        </>
      )}
    </Grid>
  )
}

export default WrappedBonds
