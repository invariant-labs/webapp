import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(_theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexGrow: 1,
    height: 54
  },

  title: {
    ...typography.body2,
    color: colors.invariant.textGrey,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    }
  },
  value: {
    height: 32,
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    width: '100%',
    flexBasis: 'auto',
    ...typography.heading4,
    color: colors.invariant.text,

    [theme.breakpoints.down('sm')]: {
      ...typography.body1
    }
  }
}))
