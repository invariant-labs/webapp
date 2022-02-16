import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  placeholderText: {
    ...newTypography.heading1,
    textAlign: 'center',
    color: colors.white.main
  }
}))

export default useStyles
