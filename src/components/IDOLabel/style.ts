import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'
const useStyle = makeStyles(theme => ({
  lableContainer: {
    width: 240,
    backgroundColor: colors.invariant.component,
    borderRadius: '24px 24px 24px 24px',

    marginLeft: 15,

    [theme.breakpoints.down('sm')]: {
      width: 500,
      margin: 15
    }
  },

  lightLabelContainer: {
    padding: '10px 0 10px 0 ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& p': {
      letterSpacing: '-0.03em',
      paddingBottom: 3,
      ...typography.caption2,
      color: colors.invariant.textGrey
    }
  },

  DarkPanelContainer: {
    padding: '10px 0 10px 0 ',
    backgroundColor: colors.invariant.newDark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      letterSpacing: '-0.03em',
      paddingBottom: 3,
      ...typography.caption2,
      color: colors.invariant.textGrey
    }
  },

  clock: {
    width: 50,
    height: 50
  },

  timeContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& h1': {
      whiteSpace: 'nowrap',
      ...typography.heading3,
      color: colors.white.main
    }
  },

  image: {
    minWidth: 20,
    height: 20,
    marginRight: 7,
    backgroundSize: 'contain'
  },
  Token: {
    borderRadius: 100
  }
}))

export default useStyle
