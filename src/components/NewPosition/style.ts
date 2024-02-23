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

    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  headerWithJupiterIcon: {
    marginBottom: 14,
    maxWidth: 464,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      minWidth: 0,
      maxWidth: '100%',

      '& .noConnectedInfo': {
        justifyContent: 'flex-start',
        paddingTop: 60
      }
    }
  },
  jupiterIcon: {
    opacity: 1,
    pointerEvents: 'none',
    select: 'none',
    transition: 'opacity 200ms'
  },
  jupiterIconDisabled: {
    opacity: 0.25,
    transition: 'opacity 200ms'
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
    marginBottom: 16,
    height: 28
  },
  switch: {
    transition: 'opacity 500ms'
  }
}))

export default useStyles
