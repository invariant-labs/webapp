import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    switch: {
      width: '100%',
      height: 32,
      borderRadius: 10,
      background: colors.invariant.newDark,
      display: 'flex'
    },
    button: {
      width: '100%',
      borderRadius: 10,
      color: colors.invariant.textGrey,
      ...typography.body2,
      textTransform: 'none',

      '&:hover': {
        background: colors.invariant.light
      }
    },
    buttonActive: {
      background: colors.invariant.light,
      color: colors.invariant.text,
      ...typography.body1,
      textTransform: 'none'
    }
  }
})
