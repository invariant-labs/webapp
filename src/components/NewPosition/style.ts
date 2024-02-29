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
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  jupiterIndicatorWrapper: {
    marginBottom: 18,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'around'
  },
  jupiterOff: {
    opacity: 0.3
  },
  jupiterIndexedModal: {
    padding: '16px',
    width: '312px',
    height: '390px',
    backgroundColor: '#202946',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '-3%',
    '& p': {
      color: '#A9B6BF'
    }
  },
  jupiterIndexedModalStatusOn: {
    color: '#2EE09A'
  },
  jupiterIndexedModalStatusOff: {
    color: '#ff0000'
  },
  jupiterIndexedModalHeading: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: '-0.03px',
    marginBottom: '24px'
  },
  jupiterIndexedModalList: {
    margin: 0,
    padding: 0,
    listStyle: 'bulleted'
  },
  marginTop: {
    marginTop: 12
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
  }
}))

export default useStyles
