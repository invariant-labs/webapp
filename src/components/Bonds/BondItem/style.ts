import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: '918px',
    width: '100%',
    backgroundColor: colors.invariant.component,
    color: colors.white.main,
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '21% 25% 11% 19% 12% 12%',
    borderTop: '2px solid #3A466B',
    ...typography.body1,

    [theme.breakpoints.down('md')]: {
      '&': {
        width: '100%',
        gridTemplateColumns: '23% 28% 14% 21% 14%'
      }
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
    padding: '0 8px 0 0',
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

      [theme.breakpoints.down('sm')]: {
        width: '22px'
      }
    }
  },
  symbol: {
    margin: '0 15px 0 8px',
    width: '73',
    height: '20',
    padding: '0 0 0 8'
  },
  purchased: {
    marginLeft: '25px',
    overflow: 'hidden'
  },
  roi: {
    color: colors.invariant.green,
    margin: 'auto'
  },
  price: {
    margin: 'auto',
    padding: '20px'
  },
  days: {
    marginLeft: '10px'
  },
  bondButton: {
    backgroundColor: colors.invariant.green,
    color: colors.invariant.dark,
    borderRadius: '10px',
    width: '80px',
    hight: '32px',
    marginLeft: 'auto',
    ...typography.body1
  }
}))
