import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
    background: colors.invariant.newDark,
    borderRadius: 16,
    gap: 12,

    [theme.breakpoints.up(416)]: {
      flexDirection: 'row'
    }
  },
  stat: {
    display: 'flex',
    gap: 4
  },
  statTitle: {
    ...typography.caption2,
    color: colors.invariant.textGrey
  },
  statDescription: {
    ...typography.caption1,
    color: colors.white.main
  }
}))
