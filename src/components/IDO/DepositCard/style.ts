import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%',
    marginRight: 24,
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      minWidth: '336px',
      marginRight: 16
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%'
    }
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 18
  },
  inputLabel: {
    ...typography.body3,
    lineHeight: '16px',
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  button: {
    marginTop: 20
  }
}))

export default useStyles
