import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    borderRadius: 24,
    padding: 16,
    boxSizing: 'border-box',
    minWidth: '100%'
  },
  liquidityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: 'normal'
  },

  liquidityHeader: {
    color: colors.invariant.textGrey,
    ...typography.body2
  },

  volumeLiquidityHeader: {
    ...typography.heading1,
    letterSpacing: '-0.03em',
    fontSize: 14,
    lineHeight: '14px',
    display: ' flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  volumeLiquidityHeaderInner: {
    ...typography.heading1,
    letterSpacing: '-0.03em',
    fontSize: 14,
    lineHeight: '14px',
    margin: '0 5px 0 0',
    fontWeight: 300,
    color: '#A9B6BF',
    display: ' flex',
    alignItems: 'center'
  },

  barContainer: {
    minWidth: 224,
    height: 124,
    display: 'flex',
    ['@media(max-width: 308px)']: {
      minWidth: 182
    }
  },

  volumePercentHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  volumeStatusContainer: {
    marginLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto'
  },
  volumeStatusColor: {
    minWidth: 'auto',
    padding: '2px 4.5px',
    borderRadius: 6
  },

  volumeStatusHeader: {
    ...typography.body1,
    filter: 'brightness(1.2)',
    fontSize: 10,
    lineHeight: '13px'
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
  },
  tooltip: {
    background: colors.invariant.component,
    border: `1px solid ${colors.invariant.lightGrey}`,
    borderRadius: 5,
    padding: '5px 10px'
  },
  tooltipDate: {
    ...typography.caption4,
    color: colors.white.main,
    textAlign: 'center'
  },
  tooltipValue: {
    ...typography.caption3,
    color: colors.invariant.green,
    textAlign: 'center'
  }
}))
