import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: 30,
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    borderRadius: 6,
    border: 'none',
    color: colors.invariant.lightInfoText,
    ...typography.body1,
    cursor: 'pointer',
    transition: '0.2s all cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backfaceVisibility: 'hidden',
    fontSmoothing: 'subpixel-antialiased',
    '&:hover': {
      transform: 'scale(1.1)'
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
  }
}))

export default useStyles
