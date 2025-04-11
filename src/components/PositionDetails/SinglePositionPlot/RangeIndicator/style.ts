import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    padding: '6px 12px',
    background: colors.invariant.newDark,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    width: 'fit-content',
    marginLeft: 'auto'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '100%',
    background: colors.invariant.pink,
    marginBottom: 1
  },
  dotInRange: {
    background: colors.invariant.green
  },
  text: {
    color: colors.invariant.pink,
    ...typography.caption1
  },
  textInRange: {
    color: colors.invariant.green
  }
}))
