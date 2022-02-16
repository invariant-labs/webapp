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
  header: {
    ...typography.heading4,
    marginBottom: 6,
    color: colors.white.main
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.component,
    width: '100%',
    position: 'relative'
  },
  subheader: {
    ...typography.heading4,
    marginBlock: 12,
    color: colors.white.main
  },
  inputs: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 16,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  input: {
    flex: '1 1 0%',
    gap: 12,

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
    width: '100%',
    flex: '1 1 0%',
    ...typography.body2,
    color: colors.white.main,
    textTransform: 'none',
    height: 36,
    paddingInline: 8,
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

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
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  infoWrapper: {
    borderRadius: 19,
    padding: 16,
    background: 'radial-gradient(286.05% 1397.73% at 101.8% 159.3%, rgba(46, 224, 154, 0.3) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(235.47% 781.83% at 5.41% 0%, rgba(239, 132, 245, 0.3) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, #3A466B, #3A466B)',
    marginBottom: 16
  },
  info: {
    color: colors.white.main,
    ...typography.body2,
    lineHeight: '22px'
  },
  midPrice: {
    marginBottom: 8
  },
  priceWrapper: {
    backgroundColor: colors.invariant.light,
    paddingInline: 12,
    paddingBlock: 10,
    borderRadius: 13,
    marginBottom: 36
  },
  priceLabel: {
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  priceValue: {
    ...typography.body1,
    color: colors.white.main
  }
}))

export default useStyles
