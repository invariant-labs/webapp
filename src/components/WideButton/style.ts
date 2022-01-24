import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    borderRadius: 16,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    color: colors.invariant.dark,
    background: `linear-gradient(180deg, ${colors.invariant.pink}80 0%, ${colors.invariant.purple}80 100%)`,
    padding: '13px auto 14px auto',
    width: '368px',
    height: '44px',
    '&:hover': {
      background: `linear-gradient(180deg, ${colors.invariant.pink} 0%, ${colors.invariant.purple} 100%)`
    }
  }
}))

export default useStyles
