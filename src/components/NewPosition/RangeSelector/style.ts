import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      flexDirection: 'column',
      borderRadius: 24,
      backgroundColor: colors.invariant.component,
      padding: '16px 24px 16px 24px',
      flex: '1 1 0%',
      position: 'relative',
      minHeight: 615,

      [theme.breakpoints.down('md')]: {
        padding: '16px 8px  12px 8px ',
        minHeight: 625
      }
    },
    headerContainer: {
      justifyContent: 'space-between',
      marginBottom: 12,
      flexDirection: 'row',
      minHeight: 65
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
      height: 185,
      [theme.breakpoints.down('md')]: {
        height: 253,
        marginBottom: 24
      }
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
      transition: '300ms',

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
      justifyContent: 'center',
      marginTop: 4,
      width: '100%',
      height: 70,
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center'
    },
    sliderWrapper: {
      paddingTop: 22,
      paddingInline: 8,
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        paddingTop: 12,
        paddingInline: 8
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
    currentPriceContainer: {
      marginTop: 23,
      textWrap: 'nowrap',
      minWidth: 'fit-content'
    },
    currentPrice: {
      display: 'inline-block',
      color: colors.invariant.yellow,
      ...typography.caption2
    },
    priceWarning: {
      display: 'inline-block',
      color: colors.invariant.Error,
      ...typography.body2,
      marginLeft: 4,
      marginTop: 2,
      fontSize: 14
    },
    priceWarningIcon: {
      width: 16,
      height: 16,
      flexShrink: 0
    },
    priceWarningContainer: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 1,
      marginTop: 2
    },
    usdcCurrentPrice: {
      display: 'inline-block',
      color: colors.invariant.text,
      ...typography.body2
    },
    checkboxLabel: {
      color: colors.invariant.textGrey,
      fontSize: 14,
      fontWeight: 'normal'
    },
    subheaderWrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 36,
      rowGap: 16
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
    priceRangeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      minHeight: 87,
      flexWrap: 'nowrap',
      flexShrink: 1
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
