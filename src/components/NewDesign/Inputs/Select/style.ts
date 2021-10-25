import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    fontSize: 16,
    backgroundColor: '#34303B',
    minWidth: 80,
    padding: '6px 10px'
  },
  icon: {
    minWidth: 18,
    height: 18
  },
  endIcon: {
    '& svg': {
      padding: 0
    }
  },
  startIcon: {

  }
}))

export default useStyles
