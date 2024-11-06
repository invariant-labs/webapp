import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    container: {
      backgroundColor: 'transparent',
      marginTop: 45,
      paddingInline: 138,
      minHeight: '70vh',

      [theme.breakpoints.down('lg')]: {
        paddingInline: 36
      },

      [theme.breakpoints.down('md')]: {
        paddingInline: 40
      },

      [theme.breakpoints.down('sm')]: {
        paddingInline: 8
      }
    }
  }
})

export default useStyles
