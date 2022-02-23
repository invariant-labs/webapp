import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 35% 17.5% 12.5% 15% 15%',
    padding: '18px 0 ',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,

    [theme.breakpoints.down(1012)]: {
      gridTemplateColumns: ': 5% 30% 14% 20% 18% 20% 20%',

      '& p': {
        ...typography.heading4
      }
    },

    [theme.breakpoints.down(450)]: {
      gridTemplateColumns: ' 10% 27% 15% 26% 20%'
    }
  },

  tokenList: {
    color: colors.white.main,
    '& p': {
      ...typography.heading4
    }
  },

  header: {
    '& p': {
      ...typography.heading4,
      fontWeight: 400
    }
  },

  tokenName: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 28,
      marginRight: 8,
      borderRadius: '50%'
    }
  },

  tokenSymbol: {
    color: colors.invariant.textGrey,
    fontWeight: 400
  }
}))
