import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  placeholderText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.white.main
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  fullHeightContainer: {
    height: '100%'
  }
}))

export default useStyles
