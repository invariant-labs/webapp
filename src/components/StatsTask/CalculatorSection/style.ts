import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  unstakeButton: {
    margin: '81px 24px 24px 24px',
    fontSize: 16,
    width: '100%',
    height: 27,
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
  containterSection: {
    marginBottom: 19
  },
  mainContainer: {
    width: 464,
    height: 'auto'
  },
  calculator: {
    marginBottom: 17
  },
  topContainer: {
    display: 'flex',
    marginBottom: 12
  },
  calculatorName: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.invariant.textGrey,
    ...typography.body2
  },
  calculatorButtons: {
    flexWrap: 'nowrap',
    margin: '19px 0 12px 12px',
    borderRadius: 8,
    backgroundColor: colors.invariant.light
  },
  button: {
    minWidth: 'auto',
    width: 39,
    hight: 20,
    borderRadius: 12,
    ...typography.caption3
  },
  selected: {
    minWidth: 'auto',
    width: 39,
    hight: 20,
    borderRadius: 8,
    ...typography.caption3,
    backgroundColor: colors.invariant.green
  }
}))

export default useStyles
