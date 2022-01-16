import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 40,
    marginTop: 20,
    width: "100%",
    borderRadius: 5,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    transition: 'background-color 0ms ease, box-shadow 150ms linear',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 4,

    '&:hover': {
      backgroundColor: `${colors.invariant.accent1}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent1}`
    },
  }
}))

export default useStyles
