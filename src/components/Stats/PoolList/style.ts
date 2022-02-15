import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

export const useStyle = makeStyles(() => ({
  container: {
    maxWidth: 1072,
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    padding: '0 24px'
  }
}))
