import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '1100px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '30px'
  },
  title: {
    fontSize: 20,
    lineHeight: '40px',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: '40px',
    fontWeight: 600,
    textTransform: 'none',
    background: '#7748D8',
    borderRadius: '10px'
  }
}))
export default useStyles
