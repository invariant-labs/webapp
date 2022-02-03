import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  data: {
    height: 36,
    paddingInline: 8,
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

    [theme.breakpoints.down('sm')]: {
      height: 36
    }
  },
  label: {
    color: colors.white.main,
    ...newTypography.body1,

    [theme.breakpoints.down('sm')]: {
      ...newTypography.body1
    }
  },
  tokens: {
    color: colors.invariant.lightHover,
    ...newTypography.body2,

    [theme.breakpoints.down('sm')]: {
      marginInline: 'auto',
      ...newTypography.body2
    }
  },
  controls: {
    // marginTop: 5,
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 10
  },
  button: {
    minWidth: 36,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(46,224,154,0.8)',
    padding: 0,
    zIndex: 1,

    '&:hover': {
      backgroundColor: colors.invariant.green,
      boxShadow: `0 0 10px ${colors.invariant.green}`
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: 40,
      width: 40,
      height: 40
    }
  },
  buttonIcon: {
    width: 22,
    height: 'auto',
    fill: colors.invariant.darkInfoText
  },
  value: {
    color: colors.white.main,
    ...newTypography.body3,
    lineHeight: 24,
    backgroundColor: colors.invariant.componentBcg,
    height: 36,
    paddingInline: 5,
    flex: '1 1 0%',

    '& $input': {
      textAlign: 'center'
    },

    [theme.breakpoints.down('sm')]: {
      height: 36
    }
  }
}))

export default useStyles
