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
  },
  infoWrapper: {
    border: `1px solid ${colors.invariant.lightInfoText}`,
    borderRadius: 10,
    padding: 16,
    backgroundColor: colors.invariant.componentOut2,
    marginBottom: 16
  },
  info: {
    color: colors.white.main,
    ...typography.body2
  },
  midPrice: {
    marginBottom: 8
  },
  priceWrapper: {
    backgroundColor: colors.invariant.componentOut2,
    paddingInline: 12,
    paddingBlock: 4,
    borderRadius: 8,
    marginBottom: 48
  },
  priceLabel: {
    ...typography.body2,
    color: colors.invariant.lightInfoText
  },
  priceValue: {
    ...typography.body1,
    color: colors.white.main
  }
}))

export default useStyles
