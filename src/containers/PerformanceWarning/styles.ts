import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    banner: {
      backgroundColor: colors.invariant.yellow,
      paddingBlock: 12,
      paddingInline: 16
    },
    icon: {
      width: 16,
      height: 16,
      marginRight: 8,
      marginBottom: -2
    },
    text: {
      ...typography.body2,
      color: colors.invariant.black,
      textAlign: 'center'
    }
  }
})

export default useStyles
