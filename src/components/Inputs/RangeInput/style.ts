import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  data: {
    height: 25,
    paddingInline: 8,
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: 3,

    [theme.breakpoints.down('sm')]: {
      height: 35
    }
  },
  label: {
    color: colors.white.main,
    ...typography.label2,

    [theme.breakpoints.down('sm')]: {
      ...typography.body1
    }
  },
  tokens: {
    color: colors.invariant.lightInfoText,
    ...typography.label1,

    [theme.breakpoints.down('sm')]: {
      marginInline: 'auto',
      ...typography.body2
    }
  },
  controls: {
    marginTop: 5
  },
  button: {
    minWidth: 30,
    width: 30,
    height: 30,
    borderRadius: 2,
    backgroundColor: colors.invariant.accent2,
    padding: 0,

    '&:hover': {
      backgroundColor: colors.invariant.logoGreen
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
    ...typography.body2,
    lineHeight: 24,
    borderBlock: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn1,
    height: 30,
    paddingInline: 5,
    flex: '1 1 0%',

    '& $input': {
      textAlign: 'center'
    },

    [theme.breakpoints.down('sm')]: {
      height: 40
    }
  }
}))

export default useStyles
