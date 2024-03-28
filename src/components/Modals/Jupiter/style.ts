import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: 'transparent',
    '& > *': {
      backgroundColor: 'transparent'
    }
  },
  wrapper: {
    width: 312,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.component,
    padding: 16,
    borderRadius: 20,
    color: colors.white.main,
    '& h2': {
      ...typography.heading4,
      paddingBottom: 10
    }
  },
  label: {
    ...typography.caption2,
    color: colors.invariant.textGrey,
    marginBottom: 15
  },
  status: {
    ...typography.caption2,
    color: colors.invariant.text,
    marginBottom: 15
  },
  link: {
    color: colors.invariant.pink,
    textDecoration: 'underline',
    textDecorationThickness: '1px'
  },
  selectClose: {
    minWidth: 0,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    },
    cursor: 'pointer',
    '&:after': {
      content: '"\u2715"',
      fontSize: 20,
      position: 'absolute',
      color: colors.white.main,
      top: '40%',
      right: '10%',
      transform: 'translateY(-50%)'
    }
  },
  active: {
    color: colors.invariant.green
  },
  inactive: {
    color: colors.invariant.Error
  },
  list: {
    margin: '0'
  }
}))

export default useStyles
