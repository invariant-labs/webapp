import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    buttonContainer: {
      display: 'flex',
      backgroundColor: colors.invariant.component,
      borderRadius: 14,
      alignItems: 'center'
    }
  }
})
