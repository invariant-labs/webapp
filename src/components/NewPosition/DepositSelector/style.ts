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
    marginTop: 18
  }
}))

export default useStyles
