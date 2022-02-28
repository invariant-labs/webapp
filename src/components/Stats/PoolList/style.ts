import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyle = makeStyles(() => ({
  container: {
    maxWidth: 1072,
    padding: '0 24px',
    borderRadius: '24px',
    backgroundColor: `${colors.invariant.component} !important`
  },
  pagination: {
    padding: '20px 0 10px 0'
  }
}))

export default useStyle
