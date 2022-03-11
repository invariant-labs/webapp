import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'
const useStyles = makeStyles((theme: Theme) => ({
  activationButton: {
    fontSize: 16,
    width: '100%',
    height: 44,
    borderRadius: 12,
    padding: '7px 40px 7px 40px',
    fontWeight: 700,
    background: colors.invariant.pinkLinearGradientOpacity,
    textTransform: 'none',
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
      maxWidth: '100%',
      borderRadius: 12
    }
  },

  sectionMainContainer: {
    width: 464,
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    height: 398
  },

  sectionContainer: {
    padding: '0 24px 19px 24px'
  },
  
  displaySectionContainer: {
    padding: '0 24px 0 24px',
    marginBottom: 81
  },

  container: {
    margin: '0 0 12px 24px'
  },

  currencyButtons: {
    marginRight: 12,
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.invariant.textGrey,
    ...typography.body2
  },

  calculatorCurrency: {
    width: 'auto',
    borderRadius: 8,
    backgroundColor: colors.invariant.componentBcg
  },

  chosen: {
    minWidth: 'auto',
    width: 39,
    height: 20,
    borderRadius: 8,
    ...typography.caption4,
    backgroundColor: colors.invariant.green,
    color: colors.invariant.black,

    '&:hover': {
      background: 'none',
      backgroundColor: colors.invariant.green
    }
  },

  bottomContainer: {
    padding: '0 24px 24px 24px'
  },

  button: {
    minWidth: 'auto',
    width: 39,
    height: 20,
    borderRadius: 12,
    ...typography.caption4,
    backgroundColor: colors.invariant.componentBcg,
    color: colors.invariant.light
  }
}))

export default useStyles
