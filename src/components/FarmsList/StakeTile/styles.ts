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
    color: colors.invariant.textGrey
  },
  value: {
    ...typography.body1,
    color: colors.white.main
  },
  buttonStake: {
    minWidth: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    background: `${colors.invariant.pinkLinearGradientOpacity} !important`,
    color: colors.black.full,
    '&:hover': {
      background: `${colors.invariant.pinkLinearGradientOpacity} !important`,
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)}'
    }
  }
}))

export default useStyles
