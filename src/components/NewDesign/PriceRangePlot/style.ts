import { makeStyles } from '@material-ui/core/styles'
import { colors, theme } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    position: 'relative',
    '& g > text': {
      stroke: 'none',
      fill: '#FFFFFF!important',
      fontFamily: 'Be Vietnam!important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '7px!important'
      }
    }
  },
  current: {
    background: colors.red.error,
    height: '100%',
    marginLeft: '50%'
  },
  zoomButton: {
    minWidth: 0,
    width: 20,
    height: 17,
    backgroundColor: colors.invariantV2.green2,
    borderRadius: 3
  },
  zoomButtonsWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    maxWidth: 20,
    height: 40,
    zIndex: 10
  }
}))

export default useStyles
