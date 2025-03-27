import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    container: {
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingInline: 138,
      minHeight: '60vh',

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
