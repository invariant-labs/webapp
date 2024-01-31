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
  text: {
    ...typography.body1
  },
  label: {
    color: `${colors.invariant.lightGrey} !important`,
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
    color: colors.invariant.text,
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
  }
}))

export default useStyles
