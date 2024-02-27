import { makeStyles } from '@material-ui/core'
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
    gap: 16,
    '& h2': {
      ...typography.heading4,
      paddingBottom: 10
    }
  },
  JupiterIndexedClose: {
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
  statusLabel: {
    fontWeight: 400,
    fontSize: 14
  },
  text: {
    ...typography.body2,
    color: colors.invariant.lightHover,
    fontSize: 14,
    fontWeight: 400
  },
  greenText: {
    color: colors.invariant.green
  },
  link: {
    color: colors.invariant.pink
  },
  list: {
    margin: 0,
    paddingLeft: 25
  }
}))

export default useStyles
