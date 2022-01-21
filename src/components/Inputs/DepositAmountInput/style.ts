import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative'
  },
  root: {
    width: '100%',
    height: 84,
    backgroundColor: colors.invariant.componentBcg,
    border: 'none',
    borderRadius: 20,
    padding: 12,
    ...newTypography.heading2,

    '& $input': {
      paddingInline: 8,
      paddingTop: 7
    },

    [theme.breakpoints.down('sm')]: {
      height: 84,
      '& $input': {
        paddingTop: 12
      }
    }
  },
  currency: {
    height: 36,
    minWidth: 86,
    width: 'fit-content',
    flexShrink: 0,
    paddingInline: 5,
    borderRadius: 11,
    backgroundColor: colors.invariant.light,

    [theme.breakpoints.down('sm')]: {
      height: 36,
      minWidth: 86
    }
  },
  currencyIcon: {
    minWidth: 20,
    height: 20,
    marginRight: 3,
    borderRadius: '100%'
  },
  currencySymbol: {
    ...newTypography.body3,
    color: colors.white.main,
    marginTop: 1
  },
  noCurrencyText: {
    ...newTypography.body3,
    color: colors.white.main
  },
  maxButton: {
    backgroundColor: colors.invariant.green,
    color: colors.invariant.componentBcg,
    ...newTypography.tiny1,
    borderRadius: 3,
    width: 26,
    minWidth: 26,
    height: 14,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: colors.invariant.green,
      boxShadow: '0px 0px 20px -10px white'
    },

    [theme.breakpoints.down('sm')]: {
      width: 26,
      minWidth: 26,
      height: 14
    }
  },
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 13, 0.88)',
    filter: 'blur(4px) brightness(0.4)'
  },
  blockedInfoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 12,
    height: '100%'
  },
  blockedInfo: {
    ...newTypography.body2,
    color: colors.invariant.light
  }
}))

export default useStyles
