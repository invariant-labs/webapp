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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.componentOut4,
    padding: 18,
    borderRadius: 10,
    color: colors.white.main,
    '& h2': {
      ...typography.heading4
    },
    '& p': {
      ...typography.label1

    }
  },
  selectTokenClose: {
    position: 'relative',
    minWidth: 0,
    height: 20,
    marginLeft: 40,
    '&:after': {
      content: '"\u2715"',
      fontSize: 25,
      position: 'absolute',
      color: 'white',
      top: '90%',
      right: '0%',
      transform: 'translateY(-50%)'
    },
    '&:hover': {
      backgroundColor: colors.invariant.componentOut4
    }
  },
  detailsInfoForm: {
    border: `1px solid ${colors.invariant.componentOut2}`,
    color: colors.white.main,
    borderRadius: 5,
    width: '93%',
    backgroundColor: colors.invariant.componentIn2,
    padding: '10px 8px',
    '&::placeholder': {
      color: colors.invariant.lightInfoText
    },
    '&:focus': {
      outline: 'none'
    }
  },
  detailsInfoBtn: {
    backgroundColor: colors.invariant.accent2,
    borderRadius: 5,
    border: 'none',
    padding: '4px 10px',
    marginLeft: -55,
    cursor: 'pointer'
  }
}))

export default useStyles
