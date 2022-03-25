import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 1072,
    padding: '0 24px',
    borderRadius: '24px',
    backgroundColor: colors.invariant.component
  },
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBlock: 10
  }
}))

export default useStyles
