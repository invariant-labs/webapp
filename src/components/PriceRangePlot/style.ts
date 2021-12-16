import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    position: 'relative',
    '& g > text': {
      stroke: 'none',
      fill: '#746E7C!important',
      fontFamily: 'Mukta!important',

      [theme.breakpoints.down('sm')]: {
        fontSize: '8px!important'
      }
    }
  },
  zoomIcon: {
    width: 14,
    height: 'auto',
    fill: '#000000',

    [theme.breakpoints.down('sm')]: {
      width: 20
    }
  },
  zoomButton: {
    minWidth: 0,
    width: 21,
    height: 18,
    backgroundColor: colors.invariant.accent2,
    borderRadius: 3,
    padding: 0,

    '&:hover': {
      backgroundColor: colors.invariant.logoGreen
    },

    [theme.breakpoints.down('sm')]: {
      width: 30,
      height: 30
    }
  },
  zoomButtonsWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    maxWidth: 21,
    height: 42,
    zIndex: 10,
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      maxWidth: 72,
      height: 30
    }
  }
}))

export default useStyles
