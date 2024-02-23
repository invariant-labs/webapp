import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 312
  },
  popover: {
    marginTop: 'calc(50vh - 350px)',
    marginLeft: 'calc(50vw - 156px)',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  container: {
    overflow: 'hidden',
    padding: 24,
    backgroundColor: colors.invariant.component,
    borderRadius: 20,
    width: 312,
    [theme.breakpoints.down('xs')]: {
      width: '100vw'
    }
  },
  jupiterIndexingHeader: {
    width: '100%',
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& h1': {
      ...typography.heading4
    }
  },
  jupiterIndexingClose: {
    minWidth: 0,
    height: 20,
    '&:after': {
      content: '"\u2715"',
      fontSize: 22,
      position: 'absolute',
      color: 'white',
      top: '50%',
      right: '0%',
      transform: 'translateY(-50%)'
    },
    '&:hover': {
      backgroundColor: '#1B191F'
    }
  },
  StatusText: {
    WebkitPaddingBefore: '2px',
    ...typography.body2,
    fontSize: '14px'
  },
  StatusBackText: {
    color: colors.invariant.textGrey,
    WebkitPaddingBefore: '2px',
    ...typography.body2,
    fontSize: '14px'
  },
  jupiterIndexingUl: {
    paddingLeft: '20px',
    listStyleType: 'disc',
    fontSize: '14px',
    color: colors.invariant.textGrey,
    marginBottom: '10px'
  },
  jupiterIndexingLink: {
    color: colors.invariant.pink,
    WebkitPaddingBefore: '2px',
    ...typography.body2,
    fontSize: '14px'
  },
  indexingActiveText: {
    color: colors.invariant.green,
    WebkitPaddingBefore: '2px',
    ...typography.body2,
    fontSize: '14px'
  },
  indexingInactiveText: {
    color: colors.invariant.Error,
    WebkitPaddingBefore: '2px',
    ...typography.body2,
    fontSize: '14px'
  }
}))

export default useStyles
