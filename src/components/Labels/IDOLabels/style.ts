import { colors, newTypography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    width: '240px',
    height: '68px',
    backgroundColor: colors.invariant.component,
    '&:hover': {
      backgroundColor: colors.invariant.componentHover
    },
    borderRadius: '0px'
  },
  title: { ...newTypography.caption2, color: colors.invariant.textLightGrey },
  value: { ...newTypography.heading4, color: colors.invariant.text },
  top: {
    borderRadius: '24px 24px 0px 0px'
  },
  middleDark: {
    backgroundColor: colors.invariant.componentDark,
    '&:hover': {
      backgroundColor: colors.invariant.component
    }
  },
  bottom: {
    borderRadius: '0px 0px 24px 24px '
  },
  icon: {
    width: '15px',
    padding: '0 8px 0 0'
  }
}))

export default useStyles
