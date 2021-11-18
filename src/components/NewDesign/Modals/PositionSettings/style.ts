import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  root: {
    background: colors.invariant.componentOut4,
    width: 266,
    borderRadius: 10,
    padding: 16,
    paddingTop: 12
  },
  header: {
    ...newTypography.subtitle2,
    lineHeight: '16px',
    color: colors.white.main
  },
  headerRow: {
    marginBottom: 12
  },
  closeIcon: {
    cursor: 'pointer'
  },
  label: {
    ...newTypography.label3,
    color: colors.white.main
  },
  valueInput: {
    padding: 9,
    height: 35,
    border: `1px solid ${colors.invariant.componentOut2}`,
    borderRadius: 5,
    backgroundColor: colors.invariant.componentIn1,
    ...newTypography.body2
  },
  autoButton: {
    width: 32,
    minWidth: 32,
    height: 17,
    ...newTypography.label3,
    borderRadius: 3,
    backgroundColor: colors.invariant.accent2,
    textTransform: 'none',
    color: colors.invariant.darkInfoText,

    '&:hover': {
      backgroundColor: colors.invariant.logoGreen
    }
  }
}))

export default useStyles
