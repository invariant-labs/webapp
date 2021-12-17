import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: 'transparent',
    marginTop: 65,
    paddingInline: 138,
    minHeight: '70vh',

    [theme.breakpoints.down('md')]: {
      paddingInline: 36
    },

    [theme.breakpoints.down('sm')]: {
      paddingInline: 40
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 16
    }
  }
}))

export default useStyles
