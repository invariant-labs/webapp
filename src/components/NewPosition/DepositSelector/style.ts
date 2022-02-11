import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  sectionTitle: {
    ...newTypography.heading4,
    marginBottom: 24,
    color: colors.white.main
  },
  sectionWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.component,
    paddingTop: 0,
    width: '100%'
  },
  inputLabel: {
    ...typography.body3,
    lineHeight: '16px',
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  selects: {
    gap: 12,
    marginBottom: 10
  },
  selectWrapper: {
    flex: '1 1 0%'
  },
  customSelect: {
    width: '100%',
    justifyContent: 'flex-start',
    border: 'none',
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 13,
    paddingInline: 13,
    height: 44,

    '& .selectArrow': {
      marginLeft: 'auto'
    },

    '&:hover': {
      backgroundColor: colors.invariant.light
    }
  },
  addButton: {
    width: '100%',
    marginTop: 24
  },
  arrows: {
    width: 32,
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(2)'
    }
  }
}))

export default useStyles
