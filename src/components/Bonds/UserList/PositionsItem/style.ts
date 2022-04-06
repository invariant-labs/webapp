import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: '918px',
    width: '100%',
    padding: '16px 0 16px 0',
    borderTop: '2px solid #3A466B',
    gridTemplateColumns: '23% 23% 19% 19% 16%',
    backgroundColor: colors.invariant.component,
    color: colors.white.main,
    ...typography.body1,

    '& *': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Mukta',

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
      marginRight: '8px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      gridTemplateColumns: '29% 25% 25% 21%'
    }
  },
  bought: {
    marginRight: 'auto'
  },
  redeemable: {
    color: colors.invariant.green
  },
  redeemButton: {
    marginLeft: 'auto',
    width: '80px',
    height: '32px',
    background: colors.invariant.pinkLinearGradient
  }
}))
