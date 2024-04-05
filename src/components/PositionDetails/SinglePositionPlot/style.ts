import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 18,
    borderRadius: 24
  },
  headerContainer: {
    ...typography.heading4,
    color: '#FFFFFF'
  },
  header: {
    paddingBottom: 30
  },
  plotWrapper: {
    paddingBottom: 29
  },
  minMaxInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    paddingBottom: 16,

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: '8px'
    }
  },
  currentPriceContainer: {
    backgroundColor: '#111931',
    borderRadius: 11
  },
  currentPriceLabel: {
    backgroundColor: colors.invariant.light,
    color: colors.invariant.lightGrey,
    textAlign: 'center',
    borderRadius: '11px!important',
    '& p': {
      ...typography.body2,
      textTransform: 'uppercase',
      lineHeight: '35px',
      [theme.breakpoints.only('md')]: {
        ...typography.caption2,
        lineHeight: '35px'
      }
    }
  },
  currentPriceAmonut: {
    backgroundColor: colors.invariant.dark,
    textAlign: 'center',
    borderRadius: '11px!important',
    '& span': {
      color: colors.invariant.text,
      ...typography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: '#A9B6BF',
      ...typography.body1,
      [theme.breakpoints.only('md')]: {
        ...typography.caption1,
        lineHeight: '35px'
      }
    }
  },
  plot: {
    width: '100%',
    height: 255,
    backgroundColor: colors.invariant.component,
    borderRadius: 10,

    [theme.breakpoints.down('xs')]: {
      height: 253
    }
  },
  infoRow: {
    marginBottom: 16
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
    cursor: 'default'
  },
  liquidityTooltip: {
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    maxWidth: 376,
    boxSizing: 'border-box',

    [theme.breakpoints.down('xs')]: {
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
    display: 'inline-block',
    color: colors.invariant.yellow,
    ...typography.caption2,
    textAlign: 'right'
  },
  globalPrice: {
    display: 'inline-block',
    color: colors.invariant.blue,
    ...typography.caption2,
    textAlign: 'right',
    marginLeft: 4
  }
}))

export default useStyles
