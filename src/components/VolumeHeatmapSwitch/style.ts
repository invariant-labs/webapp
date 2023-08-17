import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
      width: 24,
      height: 12,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 0,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: colors.invariant.green,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: colors.invariant.green,
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 12,
      height: 12,
    },
    track: {
      borderRadius: 12 / 2,
      backgroundColor: colors.invariant.black,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
}))