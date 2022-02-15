import { makeStyles } from '@material-ui/styles'
import { newTypography, colors } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    maxWidth: '524px',
    borderRadius: 24,
    padding: 30
  },
  volumeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: 'normal'
  },
  volumeHeader: {
    color: colors.invariant.textGrey,
    ...newTypography.body2
  },
  volumePercentContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  volumePercentHeader: {
    ...newTypography.heading1,
    letterSpacing: '-0.03em',
    marginTop: 5
  },
  volumeStatusContainer: {
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto'
  },
  volumeStatusColor: {
    height: 20,
    minWidth: 'auto',
    padding: '5px 15px 5px 15px',
    borderRadius: 6
  },

  volumeStatusHeader: {
    ...newTypography.body1,
    filter: 'brightness(1.2)'
  },
  barContainer: {
    height: 200,
    display: 'flex'
  },
  volumeLow: {
    color: colors.invariant.Error
  },
  backgroundVolumeLow: {
    backgroundColor: 'rgba(251,85,95,0.2)'
  },
  backgroundVolumeUp: {
    backgroundColor: 'rgba(46, 224, 149,0.2)'
  },
  volumeUp: {
    color: colors.invariant.green
  }
}))
