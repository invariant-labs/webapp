import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 952
  },
  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    flexDirection: 'column',
    marginBottom: 18,
    gap: 10,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20
    }
  },
  newLiquidityGrid: {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  indicatorIconBtn: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    [theme.breakpoints.down('sm')]: {
      width: 35,
      height: 35
    },

    '&:hover': {
      backgroundColor: 'none'
    }
  },
  indicatorIcon: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    padding: '0.2em',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  indicatorActive: {
    filter: 'brightness(1)',
    transition: 'filter 0.2s'
  },
  indicatorInactive: {
    filter: 'brightness(0.2)',
    transition: 'filter 0.2s'
  },
  indicatorPending: {
    animation: '$pulse 1s infinite'
  },
  '@keyframes pulse': {
    '0%': { filter: 'brightness(1)' },
    '50%': { filter: 'brightness(0.5)' },
    '100%': { filter: 'brightness(1)' }
  },
  options: {
    width: 'fit-content',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
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
