import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    posiiton: 'relative',
    width: 'auto',
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 12,
    height: 36,
    minWidth: 'auto',
    fontFamily: 'Mukta',
    backgroundColor: colors.invariant.light,
    ...newTypography.body3,
    padding: 5,

    filter: 'brightness(0.8)',

    '&:hover': {
      filter: 'brightness(1)',
      backgroundColor: colors.invariant.light
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 90
    }
  },
  tokenName: {
    position: 'relative',
    top: 1,
    color: colors.white.main
  },
  icon: {
    marginLeft: 8,
    minWidth: 20,
    height: 20,
    borderRadius: '100%'
  },
  endIcon: {
    marginLeft: 8,
    marginRight: 8
  }
}))

export default useStyles
