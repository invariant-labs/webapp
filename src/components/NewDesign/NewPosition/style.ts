import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 882
  },
  top: {
    marginBottom: 18
  },
  title: {
    color: colors.white.main,
    ...newTypography.heading4
  },
  settings: {
    height: 40,
    width: 'fit-content',
    cursor: 'pointer'
  },
  settingsIcon: {
    width: 20,
    height: 20,
    marginRight: 9
  },
  settingsText: {
    color: colors.invariant.lightInfoText,
    ...newTypography.body3
  }
}))

export default useStyles
