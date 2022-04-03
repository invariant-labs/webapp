import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: 'transparent',
    '& > *': {
      backgroundColor: 'transparent'
    }
  },
  detailsWrapper: {
    width: 306,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.component,
    padding: 16,
    borderRadius: 20,
    color: colors.white.main,
    '& h2': {
      ...typography.heading4,
      paddingBottom: 10
    }
  },

  label: {
    ...typography.body2,
    color: colors.invariant.lightHover,
    marginBottom: 8
  },

  selectTokenClose: {
    minWidth: 0,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    },
    cursor: 'pointer',
    '&:after': {
      content: '"\u2715"',
      fontSize: 20,
      position: 'absolute',
      color: colors.white.main,
      top: '40%',
      right: '10%',
      transform: 'translateY(-50%)'
    }
  },
  detailsInfoForm: {
    border: `1px solid ${colors.invariant.component}`,
    color: colors.invariant.light,
    borderRadius: 15,
    width: '100%',
    backgroundColor: colors.invariant.newDark,
    ...typography.heading4,
    fontWeight: 400,
    padding: 8,
    '&::placeholder': {
      color: colors.invariant.light
    },
    '&:focus': {
      outline: 'none'
    }
  },
  innerInput: {
    paddingBlock: 0
  },
  detailsInfoBtn: {
    minWidth: 49,
    backgroundColor: colors.invariant.green,
    borderRadius: 9,
    border: 'none',
    padding: 0,
    width: 49,
    height: 28,
    cursor: 'pointer',
    ...typography.body2,
    '&:hover': {
      filter: 'brightness(1.15)',
      transition: ' .4s filter',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  },
  info: {
    ...typography.caption2,
    color: colors.white.main,
    marginTop: 10,
    textAlign: 'justify'
  }
}))

export default useStyles
