import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
      paddingInline: 40,
      minHeight: '60vh',

      [theme.breakpoints.down('sm')]: {
        paddingInline: 8
      }
    },
    innerContainer: {
      maxWidth: 1072,

      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    }
  }
})

export default useStyles
