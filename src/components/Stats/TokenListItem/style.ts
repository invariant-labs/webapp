import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 35% 17.5% 12.5% 15% 15%',
    padding: '18px 0 ',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '5% 35% 12.5% 17.5% 18% 15%'
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '5% 35% 12.5% 17.5% 18% 15%',
      '& p': {
        ...typography.caption2
      }
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '5% 15% 16% 24% 25% 20%',
      '& p': {
        ...typography.caption2
      }
    }
  },

  tokenList: {
    color: colors.white.main,
    '& p': {
      ...typography.heading4
    },
    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption2
      }
    }
  },

  header: {
    '& p': {
      ...typography.heading4,
      fontWeight: 400
    },
    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption2
      }
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
