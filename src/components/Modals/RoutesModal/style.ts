import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.component,
    width: 160,
    borderRadius: 20,
    marginTop: 24,
    padding: 8
  },
  listItem: {
    paddingTop: 2,
    borderRadius: 11,
    textAlign: 'center',
    width: '100%',
    height: 40,
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginBottom: 8
    },
    '&:hover': {
      background: colors.invariant.light,
      '& $name': {
        color: colors.white.main,
        ...typography.heading4
      }
    }
  },
  name: {
    textTransform: 'capitalize',
    ...typography.heading4,
    color: colors.invariant.lightInfoText
  },
  current: {
    textTransform: 'capitalize',
    ...typography.heading4,
    color: colors.white.main
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  link: {
    textDecoration: 'none'
  }
}))

export default useStyles
