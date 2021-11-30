import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.green.snackbar,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    paddingBottom: 12,
    '& SVG': {
      color: colors.green.snackbar,
      marginTop: 4,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  error: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.red.snackbar,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxHeight: 65,
    paddingBottom: 12,
    '& SVG': {
      color: colors.red.snackbar,
      marginTop: 4,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  info: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.blue.astel,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    paddingBottom: 12,
    '& SVG': {
      color: colors.blue.astel,
      marginTop: 4,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  },
  warning: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.yellow.neon,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    paddingBottom: 12,
    '& SVG': {
      color: colors.yellow.neon,
      marginTop: 4,
      [theme.breakpoints.down('xs')]: {
        marginTop: 2
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 255,
      maxHeight: 32,
      padding: '0px 8px 5px 4px'
    }
  }
}))

export default useStyles
