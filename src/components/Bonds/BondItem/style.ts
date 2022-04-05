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
    borderTop: '2px solid #3A466B',
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      ...typography.caption1,
      gridTemplateColumns: '23% 29% 13% 21% 14%'
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      ...typography.caption3,
      gridTemplateColumns: '26% 34% 21% 19%'
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
  purchased: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roi: {
    color: colors.invariant.green,
    margin: 'auto'
  },
  price: {
    marginLeft: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  days: {
    marginLeft: '10px'
  },
  bondButton: {
    backgroundColor: colors.green.button,
    color: colors.invariant.dark,
    borderRadius: '10px',
    width: '80px',
    hight: '32px',
    marginLeft: 'auto',
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      width: '64px',
      ...typography.caption1
    }
  }
}))
