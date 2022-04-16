import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    width: '100%',
    padding: '16px 0',
    borderTop: `2px solid ${colors.invariant.light}`,
    gridTemplateColumns: '1fr 1fr 1fr 1fr 134px',
    backgroundColor: colors.invariant.component,
    color: colors.white.main,
    ...typography.body1,

    '& *': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.down('xs')]: {
        width: '100%',
        ...typography.caption1
      }
    },
    '& span': {
      color: colors.invariant.dark,
      textTransform: 'none'
    },
    '& img': {
      width: 32,
      borderRadius: '50%',
      marginRight: 8
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 80px'
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr 1fr 70px'
    }
  },
  redeemable: {
    color: colors.invariant.green
  },
  redeemButton: {
    marginLeft: 'auto',
    width: 128,
    height: 32,
    borderRadius: 10,
    background: colors.invariant.pinkLinearGradient,
    ...typography.body1,

    '&:hover': {
      background: colors.invariant.pinkLinearGradientOpacity
    },

    [theme.breakpoints.down('sm')]: {
      width: 74,
      ...typography.caption1
    },

    [theme.breakpoints.down('xs')]: {
      width: 64
    }
  },
  itemName: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginLeft: -8,
    marginRight: 8
  },
  iconItems: {
    '& img': {
      width: 32,
      borderRadius: '50%',
      marginRight: 0,

      [theme.breakpoints.down('xs')]: {
        width: 22,
        height: 22
      }
    }
  }
}))
