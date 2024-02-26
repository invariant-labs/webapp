import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 952
  },
  Wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 18,
    width: '100%',
    alignItems: 'start',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  LiquidityGridLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    gap: 10,
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  back: {
    height: 24,
    marginBottom: 18,
    width: 'fit-content',
    transition: 'filter 100ms',
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
  jupiterIconBtn: {
    padding: 0,
    margin: 0,
    width: 45,
    minWidth: 'auto',
    maxWidth: 'auto',
    height: 40,
    background: 'transparent',
    [theme.breakpoints.down('sm')]: {
      width: 35,
      height: 35
    },

    '&:hover': {
      backgroundColor: 'none'
    }
  },
  jupiterIcon: {
    padding: '0.2em',
    width: '100%',
    height: '100%',
    transition: 'filter 100ms',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(1.2)'
    }
  },
  jupiterIndicatorInactive: {
    filter: 'brightness(0.5)',
    transition: 'filter 0.2s'
  },
  jupiterIndicatorActive: {
    filter: 'brightness(1)',
    transition: 'filter 0.2s'
  },
  options: {
    width: 'fit-content',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'start',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      justifyContent: 'space-between',
      flexWrap: 'nowrap'
    }
  },
  switch: {
    transition: 'opacity 500ms'
  }
}))
export default useStyles
