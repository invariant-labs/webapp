import { Theme, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  iconBtn: {
    padding: 0,
    margin: 0,
    marginBottom: 18,
    minWidth: 'auto',
    background: 'none',
    '&:hover': {
      backgroundColor: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 15
    }
  },
  icon: {
    cursor: 'pointer',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.1)'
    }
  }
}))

export default useStyles
