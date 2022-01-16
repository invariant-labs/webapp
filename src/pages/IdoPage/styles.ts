import { makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '70vh',
    marginTop: '65px',
    backgroundColor: 'transparent',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
        padding: '0 16px',
        flexWrap: 'wrap',
      },
},
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 1,
  }

}))

export default useStyles