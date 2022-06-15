import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: 918,
    minHeight: '100%'
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  header: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 16
  },
  desc: {
    color: colors.invariant.textGrey,
    ...typography.body2,
    marginBottom: 16,
    textAlign: 'justify'
  },
  empty: {
    marginInline: 'auto',
    marginTop: 50
  }
}))

export default useStyles
