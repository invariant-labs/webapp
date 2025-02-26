import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      borderRadius: 24,
      backgroundColor: colors.invariant.component,
      padding: '16px 24px 16px 24px',
      flex: '1 1 0%',
      [theme.breakpoints.down('sm')]: {
        padding: '16px 8px  16px 8px'
      }
    },
    header: {
      ...typography.heading4,
      marginBottom: 24,
      color: colors.white.main,
      height: 24
    },
    innerWrapper: {
      borderRadius: 8,
      backgroundColor: colors.invariant.component,
      width: '100%',
      position: 'relative',
      gap: 4
    },
    topInnerWrapper: {
      minHeight: 300,
      maxWidth: '100%'
    },
    bottomInnerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
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
    buttons: {
      marginTop: 4,
      width: '100%',
      height: 70,
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center'
    },
    infoWrapper: {
      borderRadius: 19,
      padding: 16,
      background:
        'linear-gradient(138deg, rgba(110,88,146,1) 0%, rgba(58,69,101,0.9108018207282913) 47%, rgba(53,99,112,1) 100%)',
      marginBottom: 16
    },
    info: {
      color: colors.white.main,
      ...typography.body2,
      lineHeight: '22px'
    },
    midPrice: {
      marginBottom: 8
    },
    priceWrapper: {
      backgroundColor: colors.invariant.light,
      paddingInline: 12,
      paddingBlock: 10,
      borderRadius: 13,
      marginBottom: 18
    },
    priceLabel: {
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    priceValue: {
      ...typography.body1,
      color: colors.white.main
    },
    sliderWrapper: {
      paddingTop: 24,
      paddingInline: 8,
      position: 'relative',

      [theme.breakpoints.down('sm')]: {
        paddingBottom: 24
      }
    }
  }
})

export default useStyles
