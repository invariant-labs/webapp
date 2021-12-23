import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes slide-down': {
    '0%': {
      top: 0
    },
    '50%': {
      top: 60
    },
    '100%': {
      top: 0
    }
  },
  '@keyframes slide-up': {
    '0%': {
      top: 0
    },
    '50%': {
      top: -60
    },
    '100%': {
      top: 0
    }
  },
  iconLogo: {
    width: 38,
    height: 29
  },
  icon: {
    width: 15,
    height: 15,
    cursor: 'pointer'
  },
  solIcon: {
    width: 19,
    height: 19,
    cursor: 'pointer'
  },
  IDOWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
      width: '90%'
    }
  },
  containerIDO: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingBottom: 28,
    marginLeft: 20,
    width: '100%',
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    },
    '& h2': {
      ...typography.heading3,
      color: colors.white.main
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  root: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    padding: '22px 24px'
  },
  labelInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.invariant.lightInfoText
  },
  textInfo: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.white.main,
    marginLeft: 5
  },
  wrapperInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  containerInfoDark: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.darkInfoText,
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0',
      padding: '7px'
    }
  },
  info: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 30
    }
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  tokenComponentText: {
    color: colors.invariant.lightInfoText,
    ...typography.body3
  },
  amountInput: {
    position: 'relative',
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn2
  },
  amountInputDown: {
    animation: '$slide-down .3s'
  },
  amountInputUp: {
    animation: '$slide-up .3s'
  },
  valueBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  infoContainer: {
    width: '80%'
  },
  vector: {
    flexGrow: 1
  },
  depositAmouted: {
    color: colors.white.main,
    ...typography.heading4
  },
  transactionDetailsHeader: {
    color: colors.invariant.lightInfoText,
    ...typography.label1,
    cursor: 'pointer'
  },
  valueInfo: {
    color: colors.invariant.lightInfoText,
    ...typography.label1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 8
    }
  },
  boxInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  outlinedButton: {
    marginTop: '30px'
  },
  buttonBuy: {
    marginTop: '20px',
    width: '100%'
  }
}))

export default useStyles
