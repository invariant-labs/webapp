import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 508
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    ...typography.body1,
    color: colors.white.main,
    marginBottom: 10
  },
  title: {
    ...typography.heading3,
    color: colors.white.main,
    marginLeft: 10
  },
  tile: {
    marginBottom: 20
  },
  postionsInfo: {
    ...typography.body2,
    color: colors.invariant.lightGrey,
    display: 'flex',
    alignItems: 'center'
  },
  containers: { marginTop: 20 },
  value: {
    ...typography.body1,
    color: colors.white.main,
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center'
  },
  bigIcon: {
    width: 32,
    height: 32,
    marginRight: 6
  },
  smallIcon: {
    width: 17,
    height: 17,
    margin: '0 6px'
  }
}))

export default useStyles
