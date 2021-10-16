import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    minHeight: '85vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.invariant.violetWeak
  },
  item: {}
}))

export default useStyles
