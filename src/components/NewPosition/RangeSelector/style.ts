import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      borderRadius: 24,
      backgroundColor: colors.invariant.component,
      padding: '16px 24px 16px 24px',
      flex: '1 1 0%',
      position: 'relative',

      [theme.breakpoints.down('sm')]: {
        padding: '16px 8px  24px 8px '
      }
    },
    headerContainer: {
      marginBottom: 12
    },
    header: {
      ...typography.heading4,
      color: colors.white.main
    },
    innerWrapper: {
      borderRadius: 8,
      backgroundColor: colors.invariant.component,
      width: '100%',
      position: 'relative',
      gap: 16
    },
    topInnerWrapper: {
      minHeight: 300,
      maxWidth: '100%'
    },
    plot: {
      width: '100%',
      height: 185
    },
    subheader: {
      ...typography.heading4,
      color: colors.white.main
    },
    inputs: {
      flexDirection: 'row',
      gap: 16
    },
    input: {
      flex: '1 1 0%',
      gap: 12,

      [theme.breakpoints.down('md')]: {
        '&:first-of-type': {
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

      '&:hover': {
        backgroundColor: colors.invariant.lightHover2,
        '@media (hover: none)': {
          backgroundColor: colors.invariant.light
        }
      },

      [theme.breakpoints.down('md')]: {
        '&:first-of-type': {
          marginRight: 0
        }
      }
    },
    blocker: {
      position: 'absolute',
      background: 'red',
      top: 0,
      right: 0,
      zIndex: 11,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(11, 12, 13, 0.8)',
      borderRadius: 11,
      [theme.breakpoints.down('md')]: {
        right: 0,
        zIndex: 11,
        width: '100%',
        borderRadius: 9,
        textAlign: 'center'
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
      marginTop: 4,
      width: '100%',
      height: 70,
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center'
    },
    sliderWrapper: {
      paddingTop: 24,
      paddingInline: 8,
      position: 'relative',

      [theme.breakpoints.down('sm')]: {
        paddingBottom: 24
      }
    },
    warningWrapper: {
      position: 'absolute',
      top: 60,
      left: 30,

      [theme.breakpoints.down('sm')]: {
        top: 61
      }
    },
    unsafeWarning: {
      ...typography.body2,
      color: colors.invariant.Error,

      [theme.breakpoints.down('sm')]: {
        ...typography.caption4
      }
    },
    questionMark: {
      width: 14,
      height: 14,
      marginLeft: 5
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
      height: 24,
      color: colors.invariant.text,
      ...typography.caption2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      display: 'inline-block',
      color: colors.invariant.yellow,
      ...typography.caption2,
      textAlign: 'right'
    },
    checkboxLabel: {
      color: colors.invariant.textGrey,
      fontSize: 14,
      fontWeight: 'normal'
    },
    activeLiquidityContainer: {
      width: 'auto'
    },
    globalPrice: {
      display: 'inline-block',
      color: colors.invariant.blue,
      ...typography.caption2,
      textAlign: 'right',
      marginLeft: 4
    },
    buySellPrice: {
      display: 'inline-block',
      color: colors.white.main,
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
    },
    rangeConcentration: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.invariant.newDark,
      gap: 8,
      borderRadius: 11,
      padding: '6px 12px',

      '& p:first-of-type': {
        color: colors.invariant.textGrey,
        ...typography.body2
      },

      '& p:last-of-type': {
        color: colors.invariant.text,
        ...typography.body3,
        minWidth: 82,
        textAlign: 'center'
      }
    }
  }
})

export default useStyles
