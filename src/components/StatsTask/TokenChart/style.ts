import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    borderRadius: 24,
    width: '100%',
    backgroundColor: colors.invariant.component,
    color: 'white',
  },

  tokenContainer: {
    marginLeft: 24,
    alignItems: 'flex-start',
    fontWeight: 'normal',
    flexDirection: 'column'
  },

  volumePercentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop:13
  },

  tokenHeader: {
    color: colors.white.main,
    ...typography.heading4
  },

  volumeTokenHeader: {
    color:colors.invariant.textGrey,
    ...typography.caption1,
    marginRight: 5
  },

  volumeTokenUSD: {
    ...typography.caption1,
  },

  ChartContainer: {
    display: 'flex',
    with:'auto',
    height: 88.4
  },

  volumeStatusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:16,
    marginLeft: 5,
    width:39
  },

  volumeStatusColor: {
    height: 'inherit',
    alignItems: 'center',
    width: 'inherit',
    display: 'flex',
    borderRadius: 6,
    justifyContent: 'center'
  },

  volumeStatusHeader: {
    ...typography.tiny1,
    filter: 'brightness(1.2)'
  },

  backgroundVolumeLow: {
    backgroundColor: 'rgba(251,85,95,0.2)'
  },

  backgroundVolumeUp: {
    backgroundColor: 'rgba(46, 224, 149,0.2)'
  },

  volumeUp: {
    color: colors.invariant.green
  },

  volumeLow: {
    color: colors.invariant.Error
  },

  axisKeys: {
    display: 'flex',
    margin:'0 16px 0 16px',
    width:'auto',
    justifyContent:'space-between',
    paddingBottom: 22
  },

  axisKey: {
    color: colors.invariant.textGrey,
    fontFamily: 'Mukta',
    fontWeight: 400,
    fontSize: 10,
    fontStyle: 'normal'
  }
}))

export default useStyles