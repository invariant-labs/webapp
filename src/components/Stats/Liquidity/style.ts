import { alpha } from '@mui/material'
import { typography, colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    borderRadius: 24,
    paddingBlock: 24,
    paddingLeft: 24,
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 6
    }
  },
  liquidityContainer: {
    dispaly: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    marginLeft: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 6
    }
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
    minWidth: 'auto',
    padding: '5px 15px 5px 15px',
    borderRadius: 6
  },

  volumeStatusHeader: {
    ...typography.caption3,
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
  },
  tooltip: {
    background: colors.invariant.component,
    border: `1px solid ${colors.invariant.lightGrey}`,
    borderRadius: 5,
    width: 100,
    padding: 8
  },
  tooltipDate: {
    ...typography.caption2,
    color: colors.white.main,
    textAlign: 'center'
  },
  tooltipValue: {
    ...typography.caption1,
    color: colors.invariant.green,
    textAlign: 'center'
  },
  loadingOverlay: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: alpha(colors.invariant.newDark, 0.7),
      backdropFilter: 'blur(4px)',
      zIndex: 1,
      pointerEvents: 'none',
      borderRadius: '24px'
    }
  }
}))
