import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#111931',
    borderRadius: 18,
    padding: 16,
    margin: 16
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '4px 0',

    '&:first-of-type': {
      margin: '0 0 4px 0'
    },

    '&:last-of-type': {
      margin: '4px 0 0 0'
    }
  },

  title: {
    margin: '0 4px 0 0',
    color: '#a9b6bf',
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '17px'
  },
  subtitle: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    color: '#fff'
  }
}))

export default useStyles
