import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100%'
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  rootContainer: {
    maxWidth: 464,
    width: '100%',
    margin: 'auto',
    minWidth: 386,
    padding: 24,
    borderRadius: 24,
    background: '#202946'
  },
  calculatorValueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  calculatorValueSwitch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '19px 0 17px 0'
  },
  title: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    color: '#fff',
    margin: '0 auto 12px 0'
  },
  subSubtitle: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '20px',
    color: '#A9B6BF',
    margin: '0 12px 0 0'
  },
  IDOButton: {
    margin: '20px 0 0 0',
    width: '100%',
    height: 48,
    background: colors.invariant.pinkLinearGradient,
    transition: 'all 100ms ease-out'
  },
  buttonDisabled: {
    opacity: 0.7,
    background: colors.invariant.pinkLinearGradient,
    transition: 'all 100ms ease-out',

    '&:hover': {
      transition: 'all 100ms ease-out',
      filter: 'brightness(1.15)',
      background: colors.invariant.pinkLinearGradient,
      opacity: 1,
      boxShadow:
        '0px 3px 1px -2px rgba(239, 132, 245, 0.2),0px 1px 2px 0px rgba(239, 132, 245, 0.2),0px 0px 5px 7px rgba(239, 132, 245, 0.2)'
    }
  }
}))

export default useStyles
