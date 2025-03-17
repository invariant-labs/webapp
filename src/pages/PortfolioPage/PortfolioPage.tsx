import { Box, Grid, Typography } from '@mui/material'
import useStyles from './styles'
import icons from '@static/icons'
import { colors, typography } from '@static/theme'
import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'
import { useDispatch, useSelector } from 'react-redux'
import { Status, actions as walletActions } from '@store/reducers/solanaWallet'
import { useMemo } from 'react'
import { status } from '@store/selectors/solanaWallet'
import { UserOverview } from '@components/OverviewYourPositions/UserOverview'
import WrappedPositionsList from '@containers/WrappedPositionsList/WrappedPositionsList'

const PortfolioPage: React.FC = () => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)

  const isConnected = useMemo(() => walletStatus === Status.Initialized, [walletStatus])

  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.innerContainer}>
        {isConnected ? (
          <>
            <UserOverview />
            <WrappedPositionsList />
          </>
        ) : (
          <Box className={classes.notConnectedPlaceholder}>
            <img src={icons.empty} height={96} width={96} />
            <Typography
              style={{ color: colors.invariant.text, ...typography.heading2, marginBottom: '8px' }}>
              Wallet is not connected
            </Typography>
            <Typography style={{ color: colors.invariant.textGrey, ...typography.body2 }}>
              No liquidity positions to show.
            </Typography>
            <ChangeWalletButton
              name='Connect wallet'
              onConnect={() => {
                dispatch(walletActions.connect(false))
              }}
              onDisconnect={() => {
                dispatch(walletActions.disconnect())
              }}
              connected={false}
              className={classes.button}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default PortfolioPage
