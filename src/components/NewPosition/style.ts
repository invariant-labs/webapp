import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 952
  },
  back: {
    height: 24,
    marginBottom: 18,
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: colors.invariant.lightHover,
    WebkitPaddingBefore: '2px',
    ...typography.body2
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    textWrap: 'noWrap',

    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  row: {
    minWidth: 464,
    minHeight: 540,
    position: 'relative',
    flexDirection: 'row',

    '& .noConnectedLayer': {
      height: '100%'
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      minWidth: 0,

      '& .noConnectedInfo': {
        justifyContent: 'flex-start',
        paddingTop: 60
      }
    }
  },
  deposit: {
    marginRight: 24,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 24,
      marginRight: 0
    }
  },
  settingsIconBtn: {
    width: 20,
    height: 20,
    padding: 0,
    margin: 0,
    marginLeft: 10,
    minWidth: 'auto',
    background: 'none',
    '&:hover': {
      backgroundColor: 'none'
    }
  },
  settingsIcon: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  options: {
    width: 'fit-content',
    marginBottom: 18,
    height: 28
  },
  switch: {
    transition: 'opacity 500ms'
  },
  jupiterIndicatorWrapper: {
    marginBottom: 18,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  jupiterOff: {
    opacity: 0.3
  },
  modal: {
    padding: '16px',
    width: '312px',
    height: '390px',
    letterSpacing: '0',
    backgroundColor: colors.invariant.component,
    borderRadius: '20px',
    '& p': {
      color: colors.invariant.lightGrey,
      ...typography.caption2
    }
  },
  closeBtn: {
    minWidth: 0,
    background: 'none',
    '&:hover': {
      background: 'none'
    },
    cursor: 'pointer',
    '&:after': {
      content: '"\u2715"',
      fontSize: 20,
      position: 'absolute',
      color: colors.white.main,
      top: '40%',
      transform: 'translateY(-50%)'
    }
  },

  statusOn: {
    color: '#2EE09A'
  },
  statusOff: {
    color: colors.red.main
  },
  list: {
    paddingLeft: '12',
    margin: '0',
    color: colors.invariant.lightGrey,
    ...typography.caption2
  },
  link: {
    ...typography.caption2,
    color: colors.invariant.pink
  },
  header: {
    marginBottom: '10px',
    ...typography.heading4
  },
  marginTop: {
    marginTop: 12
  }
}))

export default useStyles
