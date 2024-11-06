import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ open: boolean }>()((_theme, { open }) => ({
  wrapper: {
    borderRadius: 10,
    padding: 0,
    background: colors.invariant.newDark,
    overflow: 'hidden',
    transition: 'max-height 300ms',
    maxHeight: open ? 160 : 0,
    marginBottom: open ? 12 : 0
  },
  innerWrapper: {
    padding: 16,
    minHeight: 132
  },
  row: {
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  label: {
    ...typography.body1,
    color: colors.white.main,
    marginRight: 3
  },
  value: {
    ...typography.body2,
    color: colors.white.main
  },
  loadingContainer: {
    width: 20,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  loading: {
    width: 15,
    height: 15
  }
}))
