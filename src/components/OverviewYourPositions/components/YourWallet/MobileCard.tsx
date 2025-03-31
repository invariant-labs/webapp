import { Box, Typography } from '@mui/material'
import icons from '@static/icons'
import { TokenPool, StrategyConfig } from '@store/types/userOverview'
import { formatNumberWithoutSuffix } from '@utils/utils'

type MobileCardClasses = Record<
  | 'mobileCard'
  | 'mobileCardHeader'
  | 'mobileTokenInfo'
  | 'tokenIcon'
  | 'tokenSymbol'
  | 'mobileStatsContainer'
  | 'mobileStatItem'
  | 'mobileStatLabel'
  | 'mobileStatValue'
  | 'warningIcon'
  | 'mobileActionsContainer',
  string
>

export const MobileCard: React.FC<{
  pool: TokenPool
  classes: MobileCardClasses
  renderActions: (pool: TokenPool, strategy: StrategyConfig) => JSX.Element
  getStrategy: () => StrategyConfig
}> = ({ pool, classes, renderActions, getStrategy }) => {
  const strategy = getStrategy()
  return (
    <Box className={classes.mobileCard}>
      <Box className={classes.mobileCardHeader}>
        <Box className={classes.mobileTokenInfo}>
          <img src={pool.icon} className={classes.tokenIcon} alt={pool.symbol} />
          {pool.isUnknown && <img className={classes.warningIcon} src={icons.warningIcon} />}

          <Typography className={classes.tokenSymbol}>{pool.symbol}</Typography>
        </Box>
        <Box className={classes.mobileActionsContainer}>{renderActions(pool, strategy)}</Box>
      </Box>
      <Box className={classes.mobileStatsContainer}>
        <Box className={classes.mobileStatItem}>
          <Typography component='span' className={classes.mobileStatLabel}>
            Amount:
          </Typography>
          <Typography component='span' className={classes.mobileStatValue}>
            {formatNumberWithoutSuffix(pool.amount)}
          </Typography>
        </Box>
        <Box className={classes.mobileStatItem}>
          <Typography component='span' className={classes.mobileStatLabel}>
            Value:
          </Typography>
          <Typography component='span' className={classes.mobileStatValue}>
            ${pool.value.toFixed(2).toLocaleString().replace(',', '.')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
