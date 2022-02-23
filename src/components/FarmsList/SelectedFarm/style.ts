import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: colors.invariant.component,
    padding: 16,
    paddingTop: 16,
    width: 508
  },

  stakedValue: {
    marginLeft: 2
  },

  disabledStake: {
    fontSize: 16,
    width: '100%',
    height: 27,
    borderRadius: 9,
    marginLeft: 0,
    padding: '7px 40px 7px 40px',
    background: 'none !important',
    boxShadow: 'none !important',
    textTransform: 'none',
    color: colors.invariant.light,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
      maxWidth: '100%',
      marginLeft: 0,
      borderRadius: 12
    },

    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: 'none !important',
      color: colors.invariant.lightGrey
    }
  },

  tokenImg: {
    minWidth: 20,
    minHeight: 20,
    objectFit: 'cover',
    marginRight: 10,
    borderRadius: 100
  },

  unstakeButton: {
    fontSize: 16,
    width: '100%',
    height: 27,
    borderRadius: 9,
    padding: '7px 40px 7px 40px',
    fontWeight: 700,
    background: colors.invariant.greenLinearGradientOpacity,
    textTransform: 'none',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
      maxWidth: '100%',
      borderRadius: 12
    },

    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: colors.invariant.greenLinearGradientOpacity,
      color: colors.black.full
    }
  },

  disableButton: {
    fontSize: 16,
    width: '100%',
    height: 27,
    borderRadius: 9,
    padding: '7px 40px 7px 40px',
    background: 'none !important',
    boxShadow: 'none !important',
    textTransform: 'none',
    color: colors.invariant.light,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
      maxWidth: '100%',
      borderRadius: 12
    },

    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: 'none !important',
      color: colors.invariant.lightGrey
    }
  },

  labelText: {
    justifyContent: 'center',
    ...typography.caption1,
    color: colors.invariant.textGrey,

    [theme.breakpoints.down(390)]: {
      ...typography.caption4
    }
  },
  top: {
    marginBottom: 18,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  labelGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },

  greenText: {
    ...typography.body1,
    color: colors.invariant.green,
    letterSpacing: '-0.03em',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      marginTop: 10,
      width: '100%'
    }
  },
  label: {
    color: colors.white.main,
    ...typography.caption1,
    fontWeight: 400
  },
  infoHeader: {
    ...typography.caption2,
    color: colors.invariant.textGrey,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between'
    }
  },

  infoText: {
    ...typography.caption2,
    letterSpacing: '-0.03em',
    color: colors.invariant.textGrey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center'
  },

  value: {
    color: colors.white.main,
    ...typography.caption1,
    marginLeft: 4,
    paddingBottom: 4,
    paddingTop: 4,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 5,
      paddingBottom: 5
    }
  },
  spacing: {
    marginLeft: 2
  },
  link: {
    marginTop: 20,
    textDecoration: 'none'
  },
  buttonUnstake: {
    width: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    fontWeight: 700,
    background: colors.invariant.greenLinearGradientOpacity,
    color: colors.black.full,
    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      boxShadow: '0px 0px 16px rgba(46, 224, 154, 0.35)'
    }
  },
  buttonStake: {
    width: '100%',
    maxWidth: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    background: `${colors.invariant.pinkLinearGradientOpacity} !important`,
    color: colors.black.full,
    '&:hover': {
      background: `${colors.invariant.pinkLinearGradientOpacity} !important`,
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)}'
    }
  },

  stakeLabel: {
    ...typography.body3
  },
  claimRewards: {
    width: 115,
    letterSpacing: '-0.03em',
    height: 40,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    fontWeight: 500,
    background: colors.invariant.greenLinearGradientOpacity,
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3,
      minWidth: 105
    },
    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      boxShadow: '0px 0px 8px rgba(46, 224, 154, 0.35)'
    }
  },
  infoContainer: {
    marginBottom: 20,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      dispaly: 'flex',
      flexDirection: 'column',
      maxHeight: 200
    }
  },
  boxLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  boxRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    whiteSpace: 'nowrap',
    width: '100%',
    justifyContent: 'space-between'
  },
  tokenArea: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    width: 353,
    height: 40,
    justifyContent: 'flex-start',
    marginRight: 8
  },
  token: {
    backgroundColor: colors.invariant.light,
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    padding: '3px 12px',

    [theme.breakpoints.down('xs')]: {
      borderRadius: 12
    }
  },
  tokenName: {
    color: colors.white.main,
    ...typography.caption1,
    display: 'flex',
    alignItems: 'center',

    '& p': {
      display: 'flex',
      alginItems: 'center',
      justifyContent: 'center'
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.body2
    }
  },
  tokenValue: {
    ...typography.heading4,
    color: colors.white.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px',
    [theme.breakpoints.down('xs')]: {
      ...typography.body2,
      paddingLeft: 4
    }
  },

  buttonContainer: {
    borderRadius: 9,
    backgroundColor: colors.invariant.newDark,

    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: colors.invariant.newDark
    }
  },

  stakeButton: {
    fontSize: 16,
    width: '100%',
    height: 27,
    fontWeight: 700,
    padding: '7px 40px 7px 40px',
    marginLeft: 0,
    background: 'rgba(239, 132, 245, 0.9) !important',
    textTransform: 'none',
    color: colors.black.full,
    borderRadius: 9,

    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: 'rgba(239, 132, 245, 0.9) !important',
      color: colors.black.full,
      borderRadius: 9
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
      maxWidth: '100%',
      marginLeft: 0,
      borderRadius: 12,

      '&:hover': {
        boxShadow: '0px 0px 20px -8px white',
        background: 'rgba(239, 132, 245, 0.9) !important',
        color: colors.black.full,
        borderRadius: 12
      }
    }
  },
  tokenContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10
  }
}))

export default useStyles
