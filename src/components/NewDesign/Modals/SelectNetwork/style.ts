import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.componentOut4,
    width: 170,
    borderRadius: 10,
    marginTop: 8,
    padding: 15
  },
  list: {
    background: colors.invariant.componentIn1,
    borderRadius: 5,
    marginTop: 7,
    padding: 8
  },
  listItem: {
    color: colors.invariant.lightInfoText,
    borderRadius: 5,
    padding: '3px 7px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: `${colors.invariant.componentOut2}60`,
      color: colors.white.main
    }
  },
  title: {
    ...newTypography.body1
  },
  dotIcon: {
    width: 12,
    marginLeft: 'auto',
    color: colors.invariant.accent2,
    display: 'none'
  },
  name: {
    textTransform: 'capitalize',
    ...newTypography.body2
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  icon: {
    width: 16,
    height: 16,
    display: 'inline',
    float: 'left',
    marginRight: 8,
    opacity: 1
  },
  active: {
    background: colors.invariant.componentOut2,
    color: colors.white.main,
    '& $icon': {
      opacity: 1
    },

    '& $dotIcon': {
      display: 'grid'
    }
  }
}))

export default useStyles
