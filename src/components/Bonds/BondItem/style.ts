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
    gridTemplateColumns: '21% 25% 11% 19% 12% 12%',
    borderTop: `2px solid ${colors.invariant.light}`,
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      ...typography.caption1,
      gridTemplateColumns: '23% 29% 13% 21% 14%'
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      ...typography.caption3,
      gridTemplateColumns: '33% 34% 33%'
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
        hight: '22px'
      }
    }
  },
  symbol: {
    marginRight: '15px',
    width: '73',
    height: '20',

    [theme.breakpoints.down('xs')]: {
      ...typography.caption3,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }
  },
  secondSymbol: {
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3
    }
  },
  purchased: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roi: {
    color: colors.invariant.green,
    margin: 'auto',
    fontFamily: 'Mukta'
  },
  price: {
    margin: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Mukta'
  },
  days: {
    marginLeft: '10px',
    fontFamily: 'Mukta'
  },
  bondButton: {
    background: colors.invariant.greenLinearGradient,
    color: colors.invariant.dark,
    borderRadius: '10px',
    width: '80px',
    hight: '32px',
    textTransform: 'none',
    marginLeft: 'auto',
    ...typography.body1,

    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      opacity: 0.8
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      width: '64px',
      ...typography.caption1
    }
  }
}))