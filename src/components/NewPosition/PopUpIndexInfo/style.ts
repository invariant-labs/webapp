import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  index: {
    color: 'white',
    width: 312,
    height: 420,
    background: '#202946',
    borderRadius: 20,
    padding: theme.spacing(2),
    position: 'relative',
    zIndex: 1000
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.5rem'
  },
  greyText: {
    color: '#A9B6BF',
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: '-0.03em'
  },
  active: {
    color: '#2ee09a'
  },
  inactive: {
    color: 'red',
  },
  statusTitle: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14
  }
}))

export default useStyles
