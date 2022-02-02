import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: colors.invariant.component,
    padding: 16,
    paddingTop: 16,
    width: 508
  },
  unstakeButton: {
    background: 'rgba(46, 224, 154, 0.9)',
    fontSize: 16,
    width: 92,
    height: 27,
    fontWeight: 700,
    borderRadius: 9,
    padding: '7px 0',
    textTransform: 'none',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: 'rgba(46, 224, 154, 0.9)'
    }
  },
  stakedValue: {
    marginLeft: 2
  },
  disableButton: {
    fontSize: 16,
    width: 92,
    height: 27,
    fontWeight: 400,
    borderRadius: 9,
    padding: '7px 0',
    textTransform: 'none',
    backgroundColor: colors.invariant.newDark,
    boxShadow: 'none',

    color: colors.invariant.lightInfoText,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      backgroundColor: colors.invariant.newDark,
      color: colors.invariant.lightGrey
    }
  },
  stakeButton: {
    fontSize: 16,
    width: 92,
    height: 27,
    fontWeight: 700,
    borderRadius: 9,
    padding: '7px 0',
    background: 'rgba(239, 132, 245, 0.9)',
    textTransform: 'none',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      background: 'rgba(239, 132, 245, 0.9)'
    }
  },
  labelText: {
    justifyContent: 'center',
    ...newTypography.caption1,
    color: colors.invariant.lightInfoText
  },
  top: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  labelGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36
  },
  greenText: {
    ...typography.body2,
    color: colors.invariant.green,
    letterSpacing: '-0.03em',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10
    }
  },
  label: {
    color: colors.white.main,
    ...typography.body1,
    fontWeight: 400
  },
  infoText: {
    ...typography.body2,
    letterSpacing: '-0.03em',
    color: colors.invariant.lightInfoText
  },
  value: {
    color: colors.white.main,
    ...typography.body1,
    marginLeft: 4
  },
  spacing: {
    marginLeft: 2
  },
  link: {
    marginTop: 20,
    textDecoration: 'none'
  },
  buttonStake: {
    width: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',
    color: colors.black.full,
    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)}'
    }
  },
  buttonContainer: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 16,
    width: 184,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  buttonUnstake: {
    width: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    fontWeight: 700,
    background: 'linear-gradient(180deg, rgba(46, 224, 154, 0.8) 0%, rgba(33, 164, 124, 0.8) 100%)',
    color: colors.black.full,
    '&:hover': {
      background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
      boxShadow: '0px 0px 16px rgba(46, 224, 154, 0.35)'
    }
  },
  stakeLabel: {
    ...typography.body3
  },
  claimRewards: {
    width: 115,
    letterSpacing: '-0.03em',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    background:
      'linear-gradient(180deg, rgba(46, 224, 154, 0.8) 0%, rgba(33, 164, 124, 0.8) 100%);',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      minWidth: 105
    },
    '&:hover': {
      background: '$linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
      boxShadow: '0px 0px 8px rgba(46, 224, 154, 0.35)'
    }
  },
  infoContainer: {
    marginBottom: 20,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      maxHeight: 200
    }
  },
  boxLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  boxRight: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    flexDirection: 'column',
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      width: '100%'
    }
  },
  tokenArea: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    width: 353,
    height: 40,
    justifyContent: 'flex-start',
    marginRight: 8,
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  token: {
    width: 86,
    backgroundColor: colors.invariant.light,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    padding: '3px 12px'
  },
  tokenName: {
    color: colors.white.main,
    ...typography.body1,
    [theme.breakpoints.down('xs')]: {
      ...typography.body3
    }
  },
  tokenValue: {
    ...newTypography.heading4,
    color: colors.white.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px'
  }
}))

export default useStyles
