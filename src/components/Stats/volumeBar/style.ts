import { colors, typography, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 1072,
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: 22,
    padding: 20,
    display: 'flex',
    whiteSpace: 'nowrap',
    justifyContent: 'space-between'
  },

  tokenName: {
    display: 'flex',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption2
      }
    },

    [theme.breakpoints.down('xs')]: {
      '& p': {
        ...typography.caption4
      }
    }
  },

  tokenHeader: {
    ...typography.heading4,
    color: colors.invariant.textGrey
  },

  tokenContent: {
    ...typography.heading4,
    color: colors.white.main,
    padding: '0 0 0 5px'
  },

  tokenLow: {
    color: colors.invariant.Error,
    fontWeight: 400
  },

  tokenUp: {
    color: colors.invariant.green,
    fontWeight: 400
  }
}))
