import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    fontSize: 16,
    minWidth: 70,
    backgroundColor: '#34303B',
    padding: '2px 10px'
  },
  tokenName: {
    position: 'relative',
    top: 1
  },
  icon: {
    minWidth: 18,
    height: 18,
    marginRight: 6
  },
  endIcon: {
    width: '2em',
    marginLeft: 6,
    '& svg': {
    }
  }
}))

export default useStyles
