import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 156,
    height: 147,
    borderRadius: 10,
    marginTop: 13,
    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.gray.C7C9D1,
    borderRadius: 8,
    paddingLeft: 12,
    paddingTop: 3,
    width: 140,
    height: 41,
    cursor: 'pointer',
    '&:first-child': {
      marginTop: 8
    },
    '&:nth-child(2)': {
      marginTop: 4,
      marginBottom: 4
    },
    '&:hover': {
      background: colors.navy.navButton,
      '& a p': {
        color: colors.navy.veryLightGrey,
        ...typography.body1
      }
    }
  },
  name: {
    textTransform: 'capitalize',
    ...typography.body2,
    color: colors.navy.grey
  },
  current: {
    textTransform: 'capitalize',
    ...typography.body1,
    color: colors.navy.veryLightGrey
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
