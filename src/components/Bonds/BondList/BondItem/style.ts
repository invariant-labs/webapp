import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: 918,
    width: '100%',
    backgroundColor: colors.invariant.component,
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 134px',
    borderTop: `2px solid ${colors.invariant.light}`,
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr 102px',
      ...typography.caption1
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.caption3,
      gridTemplateColumns: '1fr 1fr 70px'
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
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    '& img': {
      width: 32,
      borderRadius: '50%',

      [theme.breakpoints.down('xs')]: {
        width: 22,
        height: 22
      }
    }
  },
  symbol: {
    marginRight: 15,
    height: 20,

    [theme.breakpoints.down('xs')]: {
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
  bondButton: {
    background: colors.invariant.greenLinearGradient,
    color: colors.invariant.dark,
    borderRadius: 10,
    width: 128,
    height: '32px',
    textTransform: 'none',
    ...typography.body1,
    marginLeft: 'auto',

    '&:hover': {
      background: colors.invariant.greenLinearGradientOpacity
    },

    [theme.breakpoints.down('sm')]: {
      width: 96,
      ...typography.caption1
    },

    [theme.breakpoints.down('xs')]: {
      width: 64
    }
  }
}))
