import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

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
      background: `${colors.invariant.light}60`,
      color: colors.white.main
    },
    '&:first-child': {
      marginBottom: '4px'
    },
    '&:not(:first-child)': {
      margin: '4px 0'
    },
    '&:last-child': {
      marginTop: '4px'
    }
  },
  title: {
    ...typography.body1
  },
  dotIcon: {
    width: 12,
    marginLeft: 'auto',
    color: colors.invariant.accent2,
    display: 'none'
  },
  name: {
    textTransform: 'capitalize',
    ...typography.body2,
    paddingTop: '1px'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  icon: {
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
      display: 'block'
    }
  }
}))

export default useStyles
