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
    width: '100%',
    position: 'relative'
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
  },
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 13, 0.8)',
    filter: 'blur(4px) brightness(0.4)'
  },
  blockedInfoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 12,
    height: '100%'
  },
  blockedInfo: {
    ...newTypography.heading4,
    color: colors.invariant.lightInfoText
  }
}))

export default useStyles
