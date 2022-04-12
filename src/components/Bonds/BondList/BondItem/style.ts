import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: '918px',
    width: '100%',
    backgroundColor: colors.invariant.component,
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '2fr 1fr 2fr 1fr 86px',
    borderTop: `2px solid ${colors.invariant.light}`,
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      ...typography.caption1
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      ...typography.caption3,
      gridTemplateColumns: '1fr 1fr 70px'
    }
  },
  itemList: {
    padding: '22px 0 22px 0 32px'
  },
  itemName: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    right: '8px',
    position: 'relative'
  },
  iconItems: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    '& img': {
      width: 32,
      borderRadius: '50%',

      [theme.breakpoints.down('xs')]: {
        width: '22px',
        height: '22px'
      }
    }
  },
  symbol: {
    marginRight: '15px',
    height: '20px',

    [theme.breakpoints.down('xs')]: {
      ...typography.caption3,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }
  },
  purchased: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roi: {
    color: colors.invariant.green,
    margin: 'auto'
  },
  days: {
    marginLeft: '10px'
  },
  bondButton: {
    background: colors.invariant.greenLinearGradient,
    color: colors.invariant.dark,
    borderRadius: '10px',
    width: '80px',
    height: '32px',
    textTransform: 'none',
    ...typography.body1,
    marginLeft: 'auto',

    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      opacity: 0.8
    },
    [theme.breakpoints.down('xs')]: {
      width: '64px',
      ...typography.caption1
    }
  }
}))
