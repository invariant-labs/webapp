import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    container: {
      width: '100%',
      maxWidth: 1160,
      margin: '0 auto',
      backgroundColor: 'transparent',
      paddingInline: 80,
      justifyContent: 'center',

      [theme.breakpoints.down('lg')]: {
        paddingInline: 40,
        maxWidth: 1080
      },
      [theme.breakpoints.down('sm')]: {
        paddingInline: 8
      }
    }
  }
})

export default useStyles
