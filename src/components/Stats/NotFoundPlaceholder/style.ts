import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    title: {
      ...typography.heading2,
      color: colors.invariant.text
    },
    subtitle: {
      ...typography.body3,
      color: colors.invariant.textGrey,
      marginTop: 24
    },

    img: {
      paddingBottom: 37,
      paddingRight: 25
    }
  }
})

export default useStyles
