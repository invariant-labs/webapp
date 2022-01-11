import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  header: {
    ...typography.body1,
    marginBottom: 6,
    color: colors.white.main
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.componentIn2,
    padding: 16,
    width: '100%',
    position: 'relative'
  },
  subheader: {
    ...typography.body2,
    marginBlock: 12,
    color: colors.white.main
  },
  inputs: {
    marginBottom: 15,
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  input: {
    flex: '1 1 0%',

    '&:first-child': {
      marginRight: 8
    },

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  button: {
    flex: '1 1 0%',
    height: 25,
    ...typography.body3,
    color: colors.white.main,
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: 3,
    textTransform: 'none',

    '&:first-child': {
      marginRight: 8
    },

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  buttons: {
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

export default useStyles
