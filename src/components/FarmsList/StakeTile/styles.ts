import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: colors.invariant.component,
    padding: 16,
    width: 508
  },
  header: {},
  positionInfo: {
    flexWrap: 'nowrap'
  },
  leftSide: {},
  rightSide: {
    '& $row': {
      justifyContent: 'flex-end'
    }
  },
  row: {
  },
  label: {
    marginRight: 5
  },
  value: {},
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
