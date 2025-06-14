import { theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingInline: 185,
      minHeight: '60vh',

      [theme.breakpoints.down('lg')]: {
        paddingInline: 40
      },

      [theme.breakpoints.down('sm')]: {
        paddingInline: 8
      }
    }
  }
})

export default useStyles
