import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    width: 'fit-content',
    height: 24,
    background: colors.invariant.light,
    padding: '6px 12px',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  icon: {
    height: 20,
    width: 20,
    borderRadius: '100%'
  },
  ticker: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.white.main
  }
}))
