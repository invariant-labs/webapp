import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 508
  },
  header: {
    ...typography.heading3,
    color: colors.white.main,
    marginBottom: 5
  },
  title: {
    ...typography.heading4,
    color: colors.white.main
  },
  tile: {
    marginBottom: 20
  },
  postionsInfo: {
    ...newTypography.body2,
    color: colors.invariant.lightInfoText,
    display: 'flex',
    alignItems: 'center'
  },
  value: {
    ...newTypography.body1,
    color: colors.white.main,
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center'
  },
  bigIcon: {
    width: 32,
    height: 32
  },
  smallIcon: {
    width: 17,
    height: 17,
    marginBottom: 2
  }
}))

export default useStyles
