import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 13,
    fontSize: '20px',
    minWidth: 80,
    fontWeight: 'normal',
    backgroundColor: colors.invariant.componentBcg,
    fontFamily: 'Mukta',
    padding: '2px 10px',
    // lineHeight: '24px',
    '&:hover': {
      backgroundColor: colors.invariant.light
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 90
    }
  },
  tokenName: {
    position: 'relative',
    top: 1
  },
  icon: {
    minWidth: 18,
    height: 18,
    marginRight: 6,
    borderRadius: '100%'
  },
  endIcon: {
    width: '2em',
    marginLeft: 6,
    '& svg': {
    }
  }
}))

export default useStyles
