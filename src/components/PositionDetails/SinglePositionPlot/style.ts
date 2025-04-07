import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    height: '100%',
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingInline: 8,
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,

    [theme.breakpoints.up('sm')]: {
      paddingInline: 24
    }
  },
  liqWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: '12px'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  header: {
    ...typography.heading4,
    color: colors.white.main
  },
  plot: {
    width: '100%',
    height: 255,
    backgroundColor: colors.invariant.component,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      height: 253
    }
  },
  statsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  value: {
    color: colors.white.main
  },
  valuePercentagePlus: {
    color: colors.invariant.green
  },
  valuePercentageMinus: {
    color: colors.invariant.Error
  },
  concentrationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  concentrationValue: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.white.main
  },
  concentrationIcon: {
    marginBottom: 3
  },
  liquidityTooltip: {
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    maxWidth: 376,
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 360
    }
  },
  liquidityTitle: {
    color: colors.invariant.text,
    ...typography.heading4,
    marginBottom: 12
  },
  liquidityDesc: {
    color: colors.invariant.text,
    ...typography.caption2
  },
  liquidityNote: {
    color: colors.invariant.textGrey,
    ...typography.caption2
  },
  liquidityImg: {
    width: 80,
    minWidth: 80,
    height: 60,
    marginLeft: 16
  },
  currentPrice: {
    color: colors.invariant.yellow,
    ...typography.caption2,
    textAlign: 'right'
  },
  activeLiquidity: {
    color: colors.invariant.text,
    ...typography.caption2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'default'
  },
  activeLiquidityIcon: {
    marginLeft: 5,
    height: 14,
    width: 14,
    border: '1px solid #FFFFFF',
    color: colors.invariant.text,
    borderRadius: '50%',
    fontSize: 8,
    lineHeight: '10px',
    fontWeight: 400,
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: 3,
    cursor: 'default',
    userSelect: 'none'
  },
  globalPrice: {
    display: 'inline-block',
    color: colors.invariant.blue,
    ...typography.caption2,
    textAlign: 'right',
    marginLeft: 4
  },
  lastGlobalBuyPrice: {
    display: 'inline-block',
    color: colors.invariant.plotGreen,
    ...typography.caption2,
    textAlign: 'right',
    marginLeft: 4
  },
  lastGlobalSellPrice: {
    display: 'inline-block',
    color: colors.invariant.plotRed,
    ...typography.caption2,
    textAlign: 'right',
    marginLeft: 4
  }
}))

export default useStyles
