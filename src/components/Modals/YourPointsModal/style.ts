import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.invariant.newDark,
      width: 190,
      borderRadius: 16,
      padding: 16
    },
    list: {
      borderRadius: 5,
      marginTop: 7
    },

    listItem: {
      color: colors.invariant.textGrey,
      background: colors.invariant.component,
      borderRadius: 11,
      padding: '6px 7px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: colors.invariant.light,
        color: colors.white.main,
        '@media (hover: none)': {
          color: colors.invariant.textGrey,
          background: colors.invariant.component
        }
      },
      '&:first-of-type': {
        marginBottom: '4px'
      },
      '&:not(:first-of-type)': {
        margin: '4px 0'
      },
      '&:last-child': {
        marginTop: '4px'
      }
    },
    title: {
      ...typography.body1,
      margin: 10
    },
    dotIcon: {
      width: 12,
      marginLeft: 'auto',
      color: colors.invariant.green,
      display: 'none'
    },
    name: {
      textTransform: 'capitalize',
      ...typography.body2,
      paddingTop: '1px'
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none',
      borderRadius: '16px',
      border: '2px solid transparent',
      backgroundImage: 'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #2EE09A, #EF84F5)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    },
    icon: {
      float: 'left',
      marginRight: 8,
      opacity: 1
    },
    active: {
      background: colors.invariant.light,
      color: colors.white.main,
      '& *': {
        opacity: 1,
        display: 'block'
      }
    },
    counterItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '6px 0px',
      gap: '10px',
      width: '100%',
      height: '27px',
      background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
      borderRadius: '8px',
      fontFamily: 'Mukta',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '15px',
      textTransform: 'none',
      color: colors.invariant.dark,
      '&:hover': {
        background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)'
      }
    },
    counterContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    divider: {
      width: '100%',
      height: 0,
      borderWidth: 2,
      borderColor: colors.invariant.light,
      flexShrink: 0,
      marginTop: '16px',
      marginBottom: '16px'
    },

    counterLabel: {
      ...typography.body1,
      color: colors.invariant.textGrey,
      textWrap: 'nowrap',
      marginTop: '16px'
    },
    counterYourPoints: {
      ...typography.heading1,
      background: colors.invariant.pinkLinearGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textWrap: 'nowrap'
    },
    counterYourRanking: {
      ...typography.heading1,

      background: colors.invariant.greenLinearGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textWrap: 'nowrap'
    },
    counterYourPointsPerDay: {
      ...typography.heading1,

      background: colors.invariant.yellow,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textWrap: 'nowrap'
    },
    textLive: {
      color: colors.invariant.pink,
      textAlign: 'center',
      textShadow: `0 0 22px ${colors.invariant.pink}`
    },
    label: {
      color: colors.invariant.text,
      textAlign: 'center'
    },
    footer: {
      color: colors.invariant.textGrey,
      ...typography.body2,
      marginTop: '8px',
      textAlign: 'center'
    }
  }
})

export default useStyles
