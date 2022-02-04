import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 13,
    minWidth: 80,
    fontFamily: 'Mukta',
    backgroundColor: colors.invariant.componentBcg,
    ...newTypography.body3,
    padding: 12,

    '&:hover': {
      backgroundColor: colors.invariant.light
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 90
    }
  },
  tokenName: {
    position: 'relative',
    top: 1,
    color: colors.white.main,
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      top: -1,
      ...newTypography.caption2
    }
  },
  icon: {
    minWidth: 20,
    height: 20,
    borderRadius: '100%'
  },
  endIcon: {}
}))

export default useStyles
