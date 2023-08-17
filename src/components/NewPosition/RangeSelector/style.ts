import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  headerContainer: {
    marginBottom: 12
  },
  header: {
    ...typography.heading4,
    color: colors.white.main
  },
  switchesWrapper: {
    display: 'flex'
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.component,
    width: '100%',
    position: 'relative',
    flex: '1 1 0%'
  },
  plot: {
    width: '100%',
    height: 185
  },
  subheader: {
    ...typography.heading4,
    marginBottom: 10,
    color: colors.white.main,
    [theme.breakpoints.down('sm')]: {
      marginBlock: 16
    }
  },
  inputs: {
    marginBottom: 8,
    flexDirection: 'row',
    gap: 16
  },
  input: {
    flex: '1 1 0%',
    gap: 12,

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  button: {
    width: '100%',
    flex: '1 1 0%',
    ...typography.body2,
    color: colors.white.main,
    textTransform: 'none',
    height: 36,
    paddingInline: 8,
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  blocker: {
    position: 'absolute',
    background: 'red',
    top: 0,
    right: 0,
    zIndex: 11,
    width: '49%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 13, 0.8)',
    borderRadius: 11,
    [theme.breakpoints.down('sm')]: {
      top: 562,
      right: 0,
      zIndex: 11,
      width: '100%',
      height: 555,
      borderRadius: 9
    },

    [theme.breakpoints.down('xs')]: {
      top: 545
    }
  },

  blockedInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    ...typography.heading4,
    color: colors.invariant.lightHover,
    zIndex: 99
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  sliderWrapper: {
    paddingTop: 24,
    paddingInline: 8,
    height: 77,
    position: 'relative'
  },
  warningWrapper: {
    position: 'absolute',
    top: 60,
    left: 30,

    [theme.breakpoints.down('xs')]: {
      top: 61
    }
  },
  unsafeWarning: {
    ...typography.body2,
    color: colors.invariant.Error,

    [theme.breakpoints.down('xs')]: {
      ...typography.caption4
    }
  },
  questionMark: {
    width: 14,
    height: 14,
    marginLeft: 5
  },
  tooltip: {
    background: colors.invariant.componentBcg,
    borderRadius: 12,
    width: 300,
    textAlign: 'justify',
    padding: 10
  },
  tooltipText: {
    ...typography.caption4,
    fontSize: 13,
    color: colors.white.main
  },
  loader: {
    height: 150,
    width: 150,
    margin: 'auto'
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
    color: colors.invariant.yellow,
    ...typography.caption2,
    textAlign: 'right'
  }
}))

export default useStyles
