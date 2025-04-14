import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'
import { CHART_CONSTANTS } from './consts'

export const useMinMaxChartStyles = makeStyles()(() => ({
  container: {
    width: '100%',
    height: '55px',
    display: 'flex',
    marginTop: '18px',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
    flexDirection: 'column'
  },
  chart: {
    width: '100%',
    display: 'flex',
    borderBottom: `1px solid ${colors.invariant.light}`,
    position: 'relative',
    overflow: 'visible'
  },
  handleLeft: {
    position: 'absolute',
    left: -2,
    top: -0.3,
    zIndex: 10,
    transform: `translateX(-${CHART_CONSTANTS.CHART_PADDING}px)`
  },
  minMaxLabels: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '6px'
  },
  handleRight: {
    position: 'absolute',
    left: `${CHART_CONSTANTS.MAX_HANDLE_OFFSET}%`,
    top: -0.3,
    zIndex: 10
  },
  currentValueIndicator: {
    ...typography.caption2,
    color: colors.invariant.yellow,
    position: 'absolute',
    transform: 'translateX(-50%)',
    top: '-18px',
    whiteSpace: 'nowrap',
    zIndex: 11
  },
  priceLineIndicator: {
    position: 'absolute',
    width: '2px',
    height: '30px',
    backgroundColor: colors.invariant.yellow,
    top: '0%',
    transform: 'translateX(-50%)',
    zIndex: 5
  }
}))
