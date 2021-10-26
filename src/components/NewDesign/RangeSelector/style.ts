import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 16,
    width: 429
  },
  header: {
    ...newTypography.body1,
    marginBottom: 6,
    color: colors.white.main
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.componentIn2,
    padding: 16,
    width: '100%'
  },
  plot: {
    width: '100%',
    height: 240
  },
  subheader: {
    ...newTypography.body2,
    marginBlock: 12,
    color: colors.white.main
  },
  inputs: {
    marginBottom: 15
  },
  input: {
    width: 169
  },
  button: {
    width: 169,
    height: 25,
    ...newTypography.body3,
    color: colors.white.main,
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: 3,
    textTransform: 'none'
  }
}))

export default useStyles
