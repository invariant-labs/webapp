import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  sectionTitle: {
    ...typography.heading4,
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
    color: colors.invariant.light,
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
    marginTop: 24,
    '&:hover': {
      filter: 'brightness(1.2)',
      boxShadow: `0 0 10px ${colors.invariant.pink}`,
      transition: '.2s all'
    }
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
