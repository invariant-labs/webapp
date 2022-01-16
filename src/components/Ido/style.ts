import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    display: "inline-block",
    marginLeft: 12
  },
  USDSOLxETxBTC: {
    lineHeight: "14px !important"
  },
  xUSD: {
    fontSize: 19,
    color: "white",
    lineHeight: 1
  },
  idoWrapper: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px'
    },
    [theme.breakpoints.down('lg')]: {
      padding: '0 16px'
    },
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400,
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  root: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    paddingInline: 24,
    paddingBottom: 22,
    paddingTop: 16,
    width: 400
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  tokenComponentText: {
    color: colors.invariant.lightInfoText,
    ...typography.label1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    },
  },
  amountInput: {
    position: 'relative',
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn2
  },
  invariantLogoIDO: {
    width: 35,
    height: 31,
  },

}))

export default useStyles
