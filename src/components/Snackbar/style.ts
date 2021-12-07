import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.invariant.componentOut2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.lightInfoText,
    borderRadius: 10,
    ...typography.body1,
    maxWidth: 350,
    padding: '6px 16px',
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.accent2,
      marginTop: -2,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body2,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  error: {
    backgroundColor: colors.invariant.componentOut2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.lightInfoText,
    borderRadius: 10,
    padding: 10,
    ...typography.body1,
    maxWidth: 450,
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.error,
      marginTop: -2,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body2,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  info: {
    backgroundColor: colors.invariant.componentOut2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.lightInfoText,
    borderRadius: 10,
    padding: 10,
    ...typography.body1,
    maxWidth: 350,
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.lightInfoText,
      marginTop: -2,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body2,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  warning: {
    backgroundColor: colors.invariant.componentOut2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.lightInfoText,
    borderRadius: 10,
    padding: 10,
    ...typography.body1,
    maxWidth: 350,
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.warning,
      marginTop: -2,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body2,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  }
}))

export default useStyles
