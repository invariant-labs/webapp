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
  header: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '-0.03px'
  },
  text: {
    ...typography.body1,
    padding: '0px 0px 10px 0px',
    color: colors.invariant.lightGrey,
    fontWeight: 400,
    fontSize: 14,
    margin: '24px 0 0 0'
  },
  label: {
    color: `${colors.invariant.lightGrey} !important`,
    marginBottom: 8,
    fontWeight: 400
  },
  labelColor: {
    color: `${colors.invariant.pink} !important`
  },
  labelWhite: {
    color: 'white !important'
  },
  closeButton: {
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
    padding: 14,
    '&::placeholder': {
      color: colors.invariant.light
    },
    '&:focus': {
      outline: 'none'
    }
  },
  innerInput: {
    paddingBlock: 0,
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '-0.03px'
  },
  saveButton: {
    height: 32,
    width: '100%',
    fontSize: 14,
    margin: '24px 0 0 0',
    borderRadius: 8,
    background: colors.invariant.greenLinearGradient
  },
  saveButtonNotSaved: {
    background: colors.invariant.pinkLinearGradient
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
