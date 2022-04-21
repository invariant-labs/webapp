import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 508
  },
  header: {
    ...typography.body1,
    color: colors.white.main,
    marginBottom: 10
  },
  title: {
    ...typography.heading3,
    color: colors.white.main,
    marginLeft: 10
  },
  tile: {
    marginBottom: 20
  },
  containers: { marginTop: 20 },
  bigIcon: {
    width: 32,
    height: 32
  },
  secondBig: {
    marginLeft: -10
  },
  smallIcon: {
    width: 17,
    height: 17,
    marginRight: 5
  },
  positionInfo: {
    flexWrap: 'nowrap',
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  leftSide: {
    marginRight: 8,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: 8
    }
  },
  rightSide: {
    '& $row': {
      justifyContent: 'flex-end',

      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start'
      }
    }
  },
  row: {
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  label: {
    marginRight: 5,
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  value: {
    ...typography.body1,
    color: colors.white.main
  }
}))

export default useStyles
