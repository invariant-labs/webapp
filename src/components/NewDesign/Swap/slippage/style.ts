import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

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
    color: '#FFFFFF',
    '& h2': {
      ...newTypography.heading4
    },
    '& p': {
      ...newTypography.label1

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
      backgroundColor: '#1B191F'
    }
  },
  detailsInfoForm: {
    border: '1px solid #34303B',
    color: '#FFFFFF',
    borderRadius: 5,
    width: '93%',
    backgroundColor: '#141216',
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
