import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut1,
    padding: 16,
    paddingTop: 16,
    width: 508
  },
  unstakeButton: {
    fontSize: 16,
    width: 92,
    height: 27,
    fontWeight: 400,
    borderRadius: 6,
    padding: '7px 0',
    backgroundColor: colors.invariant.accent2,
    textTransform: 'none',
    boxShadow: '0px 0px 20px -8px white',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      backgroundColor: colors.invariant.accent2
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
    borderRadius: 6,
    padding: '7px 0',
    textTransform: 'none',
    backgroundColor: colors.invariant.componentIn2,
    color: colors.invariant.lightInfoText,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white'
    }
  },
  stakeButton: {
    fontSize: 16,
    width: 92,
    height: 27,
    fontWeight: 400,
    borderRadius: 6,
    padding: '7px 0',
    backgroundColor: colors.invariant.accent1,
    boxShadow: '0px 0px 20px -8px white',
    textTransform: 'none',
    color: colors.white.main,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: 40
    },
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white',
      backgroundColor: colors.invariant.accent1
    }
  },
  labelText: {
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
    marginBottom: 36
  },
  greenText: {
    color: colors.invariant.accent2,
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
    ...typography.body1,
    color: colors.invariant.lightInfoText
  },
  value: {
    color: colors.white.main,
    ...typography.body1,
    fontWeight: 600,
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
    height: 40,
    borderRadius: 5,
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    '&:hover': {
      backgroundColor: colors.invariant.accent1,
      boxShadow: `0px 0px 15px ${colors.invariant.accent1}`
    }
  },
  buttonContainer: {
    backgroundColor: '#1C1B1E',
    borderRadius: 6,
    width: 184,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  buttonUnstake: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent2,
    color: colors.black.full,
    '&:hover': {
      backgroundColor: `${colors.invariant.accent2}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent2}`
    }
  },
  stakeLabel: {
    ...typography.body3
  },
  claimRewards: {
    width: 120,
    height: 40,
    borderRadius: 5,
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent2,
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      minWidth: 105
    },
    '&:hover': {
      backgroundColor: `${colors.invariant.accent2}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent2}`
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
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: '5px',
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
    backgroundColor: colors.invariant.componentOut3,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
