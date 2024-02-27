import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  iconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    '&:hover': {
      backgroundColor: 'none'
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
