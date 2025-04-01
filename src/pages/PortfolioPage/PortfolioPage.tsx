import { Grid, useMediaQuery } from '@mui/material'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { Status, actions as walletActions } from '@store/reducers/solanaWallet'
import { useMemo } from 'react'
import { status } from '@store/selectors/solanaWallet'
import { UserOverview } from '@components/OverviewYourPositions/UserOverview'
import WrappedPositionsList from '@containers/WrappedPositionsList/WrappedPositionsList'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import { theme } from '@static/theme'

const PortfolioPage: React.FC = () => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

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
          <Grid className={classes.emptyContainer}>
            <EmptyPlaceholder
              newVersion
              themeDark
              style={isSm ? { paddingTop: 8 } : {}}
              roundedCorners={true}
              mainTitle='Wallet is not connected'
              desc='No liquidity positions to show'
              withButton={false}
              connectButton={true}
              onAction2={() => dispatch(walletActions.connect(false))}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default PortfolioPage
