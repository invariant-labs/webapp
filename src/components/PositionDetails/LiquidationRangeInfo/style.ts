import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  infoTypeLabel: {
    textTransform: 'uppercase',
    color: colors.invariant.lightGrey,
    ...newTypography.body2,
    lineHeight: '35px'
  },
  infoTypeSwap: {
    display: 'flex',
    backgroundColor: colors.invariant.dark,
    borderRadius: 13,
    lineHeight: '20px',
    alignItems: 'center'
  },
  infoType: {
    backgroundColor: colors.invariant.light,
    borderRadius: 13,
    textAlign: 'center',
    width: 61,
    padding: 2
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
      ...newTypography.body2,
      lineHeight: '35px'
    }
  },
  infoSwapToken: {
    color: colors.invariant.lightGrey,
    ...newTypography.body1,
    lineHeight: '35px',

    [theme.breakpoints.only('md')]: {
      ...newTypography.body1,
      lineHeight: '35px'
    }
  }
}))

export default useStyles
