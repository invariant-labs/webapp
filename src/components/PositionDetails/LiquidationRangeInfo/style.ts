import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  infoTypeLabel: {
    textTransform: 'uppercase',
    color: '#A9B6BF',
    ...newTypography.body2,
    lineHeight: '35px'

  },
  infoTypeSwap: {
    display: 'flex',
    backgroundColor: '#111931',
    borderRadius: 13,
    lineHeight: '35px'
  },
  infoType: {
    backgroundColor: colors.invariant.light,
    borderRadius: 13,
    textAlign: 'center',
    width: 61
  },
  infoSwap: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    width: '100%'
  },
  infoAmount: {
    color: colors.invariant.text,
    paddingRight: 5,
    ...newTypography.body1,
    lineHeight: '35px',

    [theme.breakpoints.only('md')]: {
      ...typography.label2,
      lineHeight: '35px'
    }
  },
  infoSwapToken: {
    color: colors.invariant.lightInfoText,
    ...typography.body1,
    lineHeight: '35px',

    [theme.breakpoints.only('md')]: {
      ...typography.label2,
      lineHeight: '35px'
    }
  }
}))

export default useStyles
