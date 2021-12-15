import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 65,
    paddingInline: 94,

    [theme.breakpoints.down('md')]: {
      paddingInline: 80
    },

    [theme.breakpoints.down('sm')]: {
      paddingInline: 90
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 16
    }
  }
}))

export default useStyles
