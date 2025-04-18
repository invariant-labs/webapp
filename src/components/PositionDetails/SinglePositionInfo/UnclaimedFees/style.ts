import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    background: colors.invariant.newDark,
    borderRadius: 16
  }
}))
