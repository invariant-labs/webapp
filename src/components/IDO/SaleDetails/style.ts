import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    borderRadius: 10,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  listItem: {
    alignItems: 'center',
    padding: 16
  },
  inputLabel: {
    ...typography.body3,
    color: colors.invariant.lightInfoText
  },
  title: {
    color: colors.white.main,
    ...typography.heading4
  }
}))

export default useStyles
