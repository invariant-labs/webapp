import { makeStyles } from '@material-ui/core/styles'
import { colors, theme } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapperContainer: {
    display: 'flex',
    width: 1058
  },
  positionDetails: {
    paddingRight: 20,
    display: 'flex',
    alignItems: 'end'
  },
  zoom: {
    right: 15,
    top: 15
  }
}))

export default useStyles
