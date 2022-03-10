import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    dispaly: 'flex',
    backgroundColor: colors.invariant.component,
    color: 'white',
    width: '100%',
    borderRadius: 24
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'flexp-start',
    fontWeight: 'normal',
    marginLeft: 24
  },

  chartHeader: {
    color: colors.white.main,
    ...typography.heading4
  },

  tokenChartSNY: {
    ...typography.caption2,
    marginRight: 5,
    color: colors.invariant.textGrey
  },

  tokenChartUSD: {
    ...typography.caption1
  },

  barContainer: {
    height: 88.4,
    width: 'auto',
    display: 'flex'
  },

  tokenPercentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 13
  },
  tokenStatusContainer: {
    display: 'flex',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 39
  },
  tokenStatusColor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    width: 'inherit',
    borderRadius: 6
  },

  tokenStatusHeader: {
    ...typography.tiny1,
    filter: 'brightness(1.2)'
  },

  tokenLow: {
    color: colors.invariant.Error
  },

  backgroundTokenLow: {
    backgroundColor: 'rgba(251,85,95,0.2)'
  },

  backgroundTokenUp: {
    backgroundColor: 'rgba(46, 224, 149,0.2)'
  },

  tokenUp: {
    color: colors.invariant.green
  },

  lineKeys: {
    margin: `0 16px 0 16px`,
    paddingBottom: 22,
    display: 'flex',
    width: 'auto',
    justifyContent: 'space-between'
  },

  keyPTag: {
    color: colors.invariant.textGrey,
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10
  }
}))

export default useStyles
