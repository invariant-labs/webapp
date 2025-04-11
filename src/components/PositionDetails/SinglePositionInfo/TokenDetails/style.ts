import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tokenContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tokenLeftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,

    [theme.breakpoints.up(368)]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  tokenValue: {
    ...typography.caption2,
    color: colors.invariant.textGrey
  },
  tokenAmount: {
    ...typography.heading2,
    color: colors.invariant.textGrey
  }
}))
