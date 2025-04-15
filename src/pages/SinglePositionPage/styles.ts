import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    container: {
      width: '100%',
      maxWidth: 1080,
      margin: '0 auto',
      backgroundColor: 'transparent',
      paddingInline: 8,
      justifyContent: 'center',

      [theme.breakpoints.up('sm')]: {
        paddingInline: 40
      }
    }
  }
})

export default useStyles
