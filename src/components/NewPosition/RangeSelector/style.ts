import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  headerContainer: {
    marginBottom: 12
  },
  header: {
    ...typography.heading4,
    color: colors.white.main
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.component,
    width: '100%',
    position: 'relative',
    flex: '1 1 0%'
  },
  plot: {
    width: '100%',
    height: 220
  },
  subheader: {
    ...typography.heading4,
    marginBlock: 12,
    color: colors.white.main
  },
  inputs: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: 16
  },
  input: {
    flex: '1 1 0%',
    gap: 16,

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  button: {
    width: '100%',
    flex: '1 1 0%',
    ...typography.body2,
    color: colors.white.main,
    textTransform: 'none',
    height: 36,
    paddingInline: 8,
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  blocker: {
    position: 'absolute',
    background: 'red',
    top: 0,
    right: 0,
    zIndex: 11,
    width: '49%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 13, 0.8)',
    borderRadius: 11,
    [theme.breakpoints.down('sm')]: {
      top: 555,
      right: 0,
      zIndex: 11,
      width: '100%',
      height: 510,
      borderRadius: 9
    },

    [theme.breakpoints.down('xs')]: {
      top: 545
    }
  },

  blockedInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    ...typography.heading4,
    color: colors.invariant.lightHover,
    zIndex: 99
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  sliderWrapper: {
    paddingTop: 24,
    paddingInline: 8
  }
}))

export default useStyles
