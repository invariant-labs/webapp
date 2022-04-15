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
    background: 'transparent',
    borderRadius: 5,
    marginTop: 7,
    padding: 2
  },
  listItem: {
    color: colors.invariant.lightGrey,
    borderRadius: 11,
    padding: '6px 7px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: colors.white.main,
      background: colors.invariant.light
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
  icon: {
    width: 20,
    height: 20,
    display: 'inline',
    float: 'left',
    marginRight: 8
  },
  name: {
    textTransform: 'capitalize',
    ...typography.body2,
    float: 'left',
    paddingTop: '2px'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
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
