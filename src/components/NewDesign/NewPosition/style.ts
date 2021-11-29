import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 882
  },
  title: {
    color: colors.white.main,
    ...newTypography.heading4,
    marginBottom: 18
  },
  row: {
    position: 'relative',

    '& .noConnectedLayer': {
      height: '100%'
    }
  }
}))

export default useStyles
