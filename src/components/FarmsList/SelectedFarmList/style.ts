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
    marginLeft: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tile: {
    marginBottom: 20
  },
  containers: { marginTop: 20 },
  bigIcon: {
    minWidth: 32,
    height: 32,
    borderRadius: '100%'
  },
  secondBig: {
    marginLeft: -10
  },
  smallIcon: {
    minWidth: 17,
    height: 17,
    marginRight: 5,
    borderRadius: '100%'
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
    color: colors.invariant.textGrey,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexShrink: 0
  },
  value: {
    ...typography.body1,
    color: colors.white.main,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export default useStyles
