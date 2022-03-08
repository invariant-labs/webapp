import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    maxWidth: '524px',
    borderRadius: 24,
    paddingLeft: 24
  },
  chartContainer: {
    dispaly: 'flex',
    flexDirection: 'column',
    alignItems: 'flexp-start',
    fontWeight: 'normal'
  },

  chartHeader: {
    color: colors.white.main,
    ...typography.body3,
    margin: '32px 0 16px 0'
  },

  tokenChartHeader: {
    ...typography.caption1
  },

  barContainer: {
    height: 220,
    width: 'auto',
    display: 'flex',
    margin: '0 100 0 100'
  },

  tokenPercentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16
  },
  tokenStatusContainer: {
    marginLeft: 10,
    display: 'flex',
    ...typography.tiny1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto'
  },
  tokenStatusColor: {
    textAlign: 'center',
    height: 16,
    width: 39,
    minWidth: 'auto',
    padding: '5px 0 5px 0',
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

export default useStyles
