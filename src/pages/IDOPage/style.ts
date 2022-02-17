import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '70vh',
    marginTop: '65px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexFlow: 'row wrap'
  },

  flow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end'
  }
}))

export default useStyles
