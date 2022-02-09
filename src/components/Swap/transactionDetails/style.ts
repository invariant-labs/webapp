import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  transactionDetailsInfo: {
    top: 0,
    left: 0,
    opacity: 1,
    zIndex: 1000,
    transition: 'all .3s',
    transitionDelay: '.1s',
    backgroundColor: colors.invariant.component,
    width: 250,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: colors.white.main,
    padding: 10,
    borderRadius: 20,
    [theme.breakpoints.down('sm')]: {
      left: 105
    },
    '& p': {
      ...typography.body1
    }
  },
  closeTransactionContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  closeTransactionButton: {
    position: 'relative',
    minWidth: 0,
    height: 20,
    marginLeft: 20,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    },
    '&:after': {
      content: '"\u2715"',
      fontSize: 25,
      position: 'absolute',
      color: colors.invariant.lightInfoText,
      top: '90%',
      right: '0%',
      transform: 'translateY(-50%)'
    }
  },

  papper: {
    position: 'absolute',
    borderRadius: 20,
    left: 252
  },
  root: {
    background: 'transparent',
    '& > *': {
      backgroundColor: 'transparent'
    }
  },
  detailsInfoWrapper: {
    height: 'auto',
    '& h2': {
      ...typography.body1
    },
    '& p': {
      ...typography.body3
    },
    '& span': {
      ...typography.label1,
      color: colors.invariant.lightInfoText
    }
  }
}))
