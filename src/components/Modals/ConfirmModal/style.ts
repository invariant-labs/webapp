import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  modal: {
    height: '100vh'
  },
  root: {
    background: colors.invariant.componentOut4,
    width: 340,
    borderRadius: 10,
    margin: '10% auto ',
    padding: '10px 15px 20px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: colors.white.main,
    ...typography.body1
  },
  desc: {
    ...typography.body3,
    lineHeight: '16px',
    color: colors.invariant.lightInfoText,
    textAlign: 'center',
    padding: 8
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 17
  },
  buttonCancel: {
    backgroundColor: colors.invariant.lightInfoText,
    color: colors.invariant.darkInfoText,
    width: 120,
    ...typography.body1,
    textTransform: 'capitalize',
    padding: '3px 16px'
  },
  buttonClaim: {
    backgroundColor: colors.invariant.accent2,
    color: colors.invariant.darkInfoText,
    width: 120,
    ...typography.body1,
    textTransform: 'capitalize',
    padding: '3px 16px'
  }
}))

export default useStyles
