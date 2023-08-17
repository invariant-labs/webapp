import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  heatmapSwitchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    transform: 'translate(6px, -5px)'
  },
  heatmapTitle: {
    display: 'flex',
    fontSize: 20
  },
  heatmapDesc: {
    color: colors.invariant.text,
    margin: '12px 0',
    ...typography.caption2
  },
  heatmapNote: {
    color: colors.invariant.textGrey,
    ...typography.caption2
  },
  heatmapTooltip: {
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    maxWidth: 376,
    boxSizing: 'border-box',

    [theme.breakpoints.down('xs')]: {
      maxWidth: 360
    }
  },
  heatmapSwitchTile: {
    display: 'flex',
    alignItems: 'center',
    color: colors.invariant.textGrey,
    fontWeight: 400,
    fontSize: '14px',
    cursor: 'default',
    transform: 'translate(4px, -1px)'
  },
  volumeHeatmapIcon: {
    marginLeft: 4,
    height: 10,
    width: 10,
    fontSize: 8,
    borderRadius: '50%',
    lineHeight: '10px',
    fontWeight: 400,
    textAlign: 'center',
    boxSizing: 'border-box',
    border: `1px solid ${colors.invariant.lightGrey}`,
    color: colors.invariant.lightGrey
  },
  switchBase: {
    color: colors.white.main,
    transform: 'translateX(8px)'
  },
  thumb: {
    width: 12,
    height: 12,
    transform: 'translate(-5px,3px)'
  },
  checked: {
    '& $thumb': {
      color: colors.white.main
    },
    '& + $track': {
      color: colors.invariant.green,
      opacity: '1 !important'
    }
  },
  track: {
    height: 12,
    width: 24,
    backgroundColor: colors.invariant.dark
  }
}))

export default useStyles
