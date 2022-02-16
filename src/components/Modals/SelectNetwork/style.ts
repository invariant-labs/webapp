import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.component,
    width: 170,
    borderRadius: 20,
    marginTop: 8,
    padding: 8
  },
  list: {
    borderRadius: 5,
    marginTop: 7
  },
  listItem: {
    color: colors.invariant.textGrey,
    background: colors.invariant.component,
    borderRadius: 11,
    padding: '3px 7px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: colors.invariant.light,
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
    ...typography.body1,
    margin: 10
  },
  dotIcon: {
    width: 12,
    marginLeft: 'auto',
    color: colors.invariant.green,
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
    background: colors.invariant.light,
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
