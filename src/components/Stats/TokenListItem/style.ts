import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    // - gridTemplateColumns: '5% 35% 15% 15% 15% 15%',
    gridTemplateColumns: '5% 45% 17.5% 17.5% 15%',
    padding: '18px 0 ',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '5% 45% 17.5% 17.5% 15%',
      '& p': {
        ...typography.caption2
      }
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '15% 25% 35% 25%'
    }
  },

  tokenList: {
    color: colors.white.main,
    '& p': {
      ...typography.heading4
    },

    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption1
      }
    }
  },

  header: {
    '& p': {
      ...typography.heading4,
      fontWeight: 400,
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center'
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
    paddingRight: 5,

    '& p': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    '& img': {
      minWidth: 28,
      maxWidth: 28,
      height: 28,
      marginRight: 8,
      borderRadius: '50%'
    }
  },

  tokenSymbol: {
    color: colors.invariant.textGrey,
    fontWeight: 400
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -4
    }
  }
}))
