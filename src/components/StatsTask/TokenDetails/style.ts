import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography, theme } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 18,
    backgroundColor: colors.invariant.componentBcg,
    padding: '24px 16px 0 16px',
    margin: '0 16px 0 16px'
  },
  label: {
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    lineHeight: 0,
    paddingBottom: 8,
    letterSpacing: '-0.03em'
  },
  value: {
    color: colors.white.main,
    fontFamily: theme.typography.fontFamily,
    ...typography.caption1,
    lineHeight: 0,
    paddingBottom: 8,
    letterSpacing: '-0.03em'
  },
  spacer: {
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default useStyles
