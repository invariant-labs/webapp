import { typography, colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    color: 'white',
    borderRadius: 24,
    boxSizing: 'border-box'
  },
  liquidityContainer: {
    dispaly: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    marginLeft: 24,

    [theme.breakpoints.down('sm')]: {
      marginLeft: 8
    }
  },

  liquidityHeader: {
    color: colors.invariant.textGrey,
    ...typography.body2
  },

  volumeLiquidityHeader: {
    ...typography.heading1,
    letterSpacing: '-0.03em',
    marginTop: 5
  },

  barContainer: {
    height: 200,
    display: 'flex'
  },

  volumePercentHeader: {
    display: 'flex',
    alignItems: 'center'
  },

  tooltip: {
    background: colors.invariant.component,
    border: `1px solid ${colors.invariant.lightGrey}`,
    borderRadius: 5,
    width: 100,
    padding: 8
  },
  tooltipDate: {
    ...typography.caption2,
    color: colors.white.main,
    textAlign: 'center'
  },
  tooltipValue: {
    ...typography.caption1,
    color: colors.invariant.green,
    textAlign: 'center'
  }
}))
