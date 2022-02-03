import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    position: 'relative',
    '& g > text': {
      stroke: 'none',
      fill: '#A9B6BF!important',
      fontFamily: 'Mukta!important',

      [theme.breakpoints.down('sm')]: {
        fontSize: '8px!important'
      }
    }
  },
  zoomIcon: {
    width: 18,
    height: 'auto',
    fill: '#111931',

    [theme.breakpoints.down('sm')]: {
      width: 22
    }
  },
  zoomButton: {
    minWidth: 28,
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(46,224,154,0.8)',
    padding: 0,

    '&:hover': {
      backgroundColor: colors.invariant.green,
      boxShadow: `0 0 10px ${colors.invariant.green}`
    },

    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40
    }
  },
  zoomButtonsWrapper: {
    position: 'absolute',
    top: 0,
    right: 8,
    maxWidth: 21,
    height: 64,
    zIndex: 10,
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      maxWidth: 92,
      height: 40
    }
  },
  loadingText: {
    ...typography.heading4,
    fill: colors.invariant.darkInfoText
  }
}))

export default useStyles
