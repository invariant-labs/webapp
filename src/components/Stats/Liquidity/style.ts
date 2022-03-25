import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    borderRadius: 24,
    paddingBlock: 24
  },
  liquidityContainer: {
    dispaly: 'flex',
    flexDirection: 'column',
    alignItems: 'flexp-start',
    fontWeight: 'normal',
    marginLeft: 24
  },

  liquidityHeader: {
    color: colors.invariant.textGrey,
    ...typography.body2
  },

  volumeLiquidityHeader: {
    ...typography.heading1,
    letterSpacing: '-0.03em',
    marginTop: 5
  },

  barContainer: {
    height: 200,
    display: 'flex'
  },

  volumePercentHeader: {
    display: 'flex',
    alignItems: 'center'
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
    ...typography.body1,
    filter: 'brightness(1.2)'
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
  },

  LineKeys: {
    marginLeft: 10,
    display: 'flex',
    width: '100%'
  },

  keyPTag: {
    width: '100%',
    color: colors.invariant.textGrey,
    ...typography.caption4
  }
}))
