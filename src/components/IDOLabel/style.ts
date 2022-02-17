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

  topLabelRadius: {
    borderRadius: '24px 24px 0  0'
  },
  bottomLabelRadius: {
    borderRadius: '0 0 24px  24px'
  },

  lightLabelContainer: {
    padding: '10px 0 10px 0 ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.8,
    '& p': {
      letterSpacing: '-0.03em',
      paddingBottom: 3.5,
      ...typography.caption2,
      color: colors.invariant.textGrey
    },
    backgroundColor: colors.invariant.component,
    '&:hover': {
      filter: 'brightness(1.5)'
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
      paddingBottom: 3.5,
      ...typography.caption2,
      color: colors.invariant.textGrey
    },

    '&:hover': {
      backgroundColor: colors.invariant.component
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

  smallImage: {
    minWidth: 18,
    height: 18,
    marginRight: 7,
    backgroundSize: 'contain'
  },

  Token: {
    borderRadius: 100
  }
}))

export default useStyle
