import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  sectionTitle: {
    ...typography.body1,
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
    ...typography.body3,
    lineHeight: '16px',
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  selects: {
    marginBottom: 10
  },
  selectWrapper: {
    flex: '1 1 0%',

    '&:first-child': {
      marginRight: 8
    }
  },
  customSelect: {
    width: '100%',
    justifyContent: 'flex-start',
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn1,
    borderRadius: 5,
    paddingInline: 13,
    height: 44,

    '& .selectArrow': {
      marginLeft: 'auto'
    },

    '&:hover': {
      backgroundColor: colors.invariant.componentIn2
    }
  },
  addButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    ...typography.body1,
    textTransform: 'none',
    marginTop: 18,

    '&:hover': {
      boxShadow: `0 0 15px ${colors.invariant.accent1}`,
      backgroundColor: colors.invariant.accent1
    },

    '&:disabled': {
      backgroundColor: colors.invariant.componentOut3,
      color: colors.invariant.lightInfoText
    }
  }
}))

export default useStyles
