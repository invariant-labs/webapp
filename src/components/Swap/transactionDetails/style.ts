import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

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
    padding: '10px 15px 10px 15px',
    borderRadius: 20,
    [theme.breakpoints.down('sm')]: {
      left: 105
    },
    '& p': {
      ...newTypography.body2
    }
  },
  closeTransactionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
    '& p': {
      ...newTypography.heading1
    }
  },

  closeTransactionButton: {
    minWidth: 0,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    },
    cursor: 'default',
    '&:after': {
      content: '"\u2715"',
      fontSize: 20,
      position: 'absolute',
      color: colors.white.main,
      top: '50%',
      right: '10%',
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
    '& h1': {
      ...newTypography.heading4
    },
    '& p': {
      ...newTypography.body2
    },
    '& span': {
      ...newTypography.body2,
      color: colors.invariant.lightGrey
    }
  }
}))
