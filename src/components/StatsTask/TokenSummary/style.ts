import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography,theme } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    borderRadius: 18,
    backgroundColor: colors.invariant.componentBcg,
    padding: '24px 16px 0 16px',
    width:'100%',
    margin:'0 16px 0px 16px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  category: {
    fontFamily:theme.typography.fontFamily,
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    fontStyle:'normal',
    letterSpacing: '-0.03em',
    alignItems:'center',
    lineHeight: 0
  },
  
  token: {
    color: colors.white.main,
    fontFamily:theme.typography.fontFamily,
    ...typography.caption1,
    lineHeight: 0,
    paddingBottom: 8,
    textAlign:'right'
  },

  spacing: {
    display: 'flex',
    fontFamily: 'Mukta',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16
  }
}))

export default useStyles