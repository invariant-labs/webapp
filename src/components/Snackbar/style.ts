import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.invariant.component,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.component,
    borderRadius: 10,
    ...typography.body1,
    maxWidth: 350,
    padding: '6px 16px',
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.green,
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
    backgroundColor: colors.invariant.component,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.component,
    borderRadius: 10,
    padding: 10,
    ...typography.body1,
    maxWidth: 450,
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.Error,
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
    backgroundColor: colors.invariant.component,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.component,
    borderRadius: 10,
    padding: 10,
    ...typography.body1,
    maxWidth: 350,
    maxHeight: 64,
    minWidth: 100,
    '& SVG': {
      color: colors.invariant.textGrey,
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
    backgroundColor: colors.invariant.component,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.invariant.component,
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
