import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 16,
    width: 350,
    borderRadius: 20,
    background: colors.invariant.component,
    color: colors.invariant.lightHover
  },
  titleContent: {
    display: 'flex',
    justifyContent: 'space-beetween',
    alignItems: 'center',
    color: colors.white.main
  },
  closeButton: {
    marginLeft: 'auto'
  },
  statusGreen: {
    color: colors.green.main
  },
  statusRed: {
    color: colors.red.main
  }
}))

export default useStyles
