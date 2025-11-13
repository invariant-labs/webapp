import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    marginTop: 72
  },

  container: {
    background: colors.invariant.component,
    padding: 24,
    borderRadius: 24,
    marginTop: 16,
    minHeight: 100,

    [theme.breakpoints.down('sm')]: {
      padding: '24px 8px'
    }
  },
  header: {
    ...typography.heading4,
    color: colors.invariant.text
  }
}))

export default useStyles
