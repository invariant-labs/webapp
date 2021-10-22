import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.modalBack,
    width: 200,
    borderRadius: 10,
    marginTop: 14,
    padding: 15
  },
  list: {
    background: colors.invariant.modalBackList,
    borderRadius: 5,
    marginTop: 13,
    padding: 8
  },
  listItem: {
    color: '#746E7C',
    borderRadius: 5,
    padding: 8,
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: '#2A2932',
      color: colors.navy.veryLightGrey,

      '& $name': {
        ...typography.subtitle2
      },
      '& $dotIcon': {
        display: 'grid'
      }
    }
  },
  title: {
    ...typography.subtitle2
  },
  dotIcon: {
    width: 12,
    marginLeft: 'auto',
    color: '#9DD46D',
    display: 'none'
  },
  icon: {
    width: 27,
    height: 27,
    display: 'inline',
    float: 'left',
    marginRight: 8
  },
  name: {
    textTransform: 'capitalize',
    ...typography.subtitle2,
    fontWeight: 400,
    float: 'left'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
