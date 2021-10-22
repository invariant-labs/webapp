import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    fontSize: 16,
    backgroundColor: '#34303B',
    padding: 0,
    width: 'min-content'
  },
  icon: {
    minWidth: 14,
    height: 14,
    marginLeft: 10
  },
  endIcon: {
    '& svg': {
      padding: 0
    }
  },
  startIcon: {
    marginRight: 6
  }
}))

export default useStyles
