import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  icon: {
    width: '100%',
    height: '100%',
    marginBottom: 12,
    cursor: 'pointer'
  },
  iconButton: {
    width: 'auto',
    height: 'auto',
    padding: 0
  },
  popoverWrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%',
    width: 280
  },
  titleWrapper: {
    display: 'flex'
  },
  popoverTitle: {
    ...typography.heading4,
    marginBottom: 24,
    color: colors.white.main,
    flex: 1,
    paddingTop: 8
  },
  statusText: {
    ...typography.caption1,
    marginBottom: 20
  },
  green: {
    color: colors.green.main
  },
  red: {
    color: colors.red.error
  },
  bodyText: {
    ...typography.caption2,
    marginBottom: 20,
    display: 'block'
  },
  link: {
    color: colors.invariant.pink
  },
  closeButton: {
    height: 40,
    width: 40
  }
}))

export default useStyles
