import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  tokenContainer: {
    background: colors.invariant.newDark,
    borderRadius: 16,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}))
