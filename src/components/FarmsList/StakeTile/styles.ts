import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: colors.invariant.component,
    padding: 16,
    width: 508
  },
  header: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 12
  },
  positionInfo: {
    flexWrap: 'nowrap',
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: 16,
    padding: '12px 16px',
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
  },
  buttonStake: {
    minWidth: '100%'
  }
}))

export default useStyles
