import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    fontSize: 16,
    minWidth: 80,
    backgroundColor: '#34303B',
    padding: '2px 10px',
    '&:hover': {
      backgroundColor: colors.invariant.componentOut3
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
