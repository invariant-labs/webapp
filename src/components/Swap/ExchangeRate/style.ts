import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  rateText: {
    color: colors.invariant.lightInfoText,
    textAlign: 'right',
    ...typography.label1,
    display: 'flex',
    justifyContent: 'center'
  },
  loadingContainer: {
    width: 120,
    display: 'grid',
    justifyContent: 'center'
  },
  loading: {
    height: '100%',
    width: 15,
    zIndex: 10,
    margin: '0 auto'
  }
}))

export default useStyles
