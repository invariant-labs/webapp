import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: 'transparent',
    '& > *': {
      backgroundColor: 'transparent'
    }
  },
  detailsWrapper: {
    width: 312,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.component,
    padding: 16,
    borderRadius: 20,
    color: colors.white.main,
    '& h2': {
      ...typography.heading4
    }
  },
  selectJupiterClose: {
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
  statusWrapper: {
    display: 'flex',
    justifyContent: 'start',
    gap: 3,
    marginBottom: '1em',

    '& p': {
      ...typography.caption2
    }
  },

  text: {
    ...typography.caption2,
    color: colors.invariant.lightHover
  },
  list: {
    paddingLeft: 24,
    margin: 0,
    fontSize: 10
  },
  link: {
    color: colors.invariant.pink
  }
}))

export default useStyles
