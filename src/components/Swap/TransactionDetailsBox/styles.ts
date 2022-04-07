import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles<Theme, { open: boolean }>(() => ({
  wrapper: ({ open }) => ({
    borderRadius: 10,
    padding: open ? 16 : 0,
    background: colors.invariant.newDark,
    overflow: 'hidden',
    transition: 'max-height 2s',
    maxHeight: open ? 162 : 0
  }),
  row: {
    '&:not(:last-child)': {
      marginBottom: 12
    }
  },
  label: {
    ...typography.body1,
    color: colors.white.main
  },
  value: {
    ...typography.body2,
    color: colors.white.main
  }
}))
