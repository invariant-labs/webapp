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
  sectionTitle: {
    ...newTypography.body1,
    marginBottom: 6,
    color: colors.white.main
  },
  sectionWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.componentIn2,
    padding: 16,
    paddingTop: 10,
    width: '100%'
  },
  inputLabel: {
    ...newTypography.label3,
    lineHeight: '16px',
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  selects: {
    marginBottom: 3
  },
  selectWrapper: {
    width: 170
  },
  addButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    ...newTypography.body1,
    textTransform: 'none',
    marginTop: 18,

    '&:hover': {
      boxShadow: `0 0 15px ${colors.invariant.accent1}`,
      backgroundColor: colors.invariant.accent1
    }
  }
}))

export default useStyles
