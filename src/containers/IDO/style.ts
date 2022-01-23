import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  idoContainer: {
    width: '416px',
    height: '340px',
    padding: '24px',
    boxSizing: 'border-box',
    marginRight: '16px',
    borderRadius: '24px',
    backgroundColor: colors.invariant.component,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    fontFamily: 'Mukta',
    ...typography.heading3,
    color: colors.invariant.text,
    margin: '0'
  }
}))

export default useStyles
