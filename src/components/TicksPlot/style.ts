import { makeStyles } from '@material-ui/core/styles'
import { colors, theme } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
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
  }
}))

export default useStyles
