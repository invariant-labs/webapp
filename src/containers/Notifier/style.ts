import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: 30,
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    borderRadius: 6,
    border: 'none',
    color: colors.invariant.textGrey,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: '0.2s all cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backfaceVisibility: 'hidden',
    fontSmoothing: 'subpixel-antialiased',
    '&:hover': {
      transform: 'scale(1.15) translateY(0px)'
    },
    [theme.breakpoints.down('xs')]: {
      width: 36,
      height: 16,
      fontSize: 9,
      lineHeight: '14px',
      marginTop: 2,
      marginRight: 8,
      paddingBottom: 17,
      paddingRight: 36
    }
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    '& img': {
      width: 16,
      transition: '.2s all ease-in',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.1)'
      }
    }
  },
  detailsWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  pendingContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  pendingMessage: {
    width: 100
  }
}))

export default useStyles
