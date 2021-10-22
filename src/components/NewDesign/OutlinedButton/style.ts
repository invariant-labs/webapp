import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    borderRadius: 10,
    textAlign: 'center',
    textTransform: 'none',
    fontSize: 16,
    transition: 'all 500ms ease',
    padding: '10px 19px',
    '&:hover': {
      opacity: 0.9
    }
  },
  disabled: {
    background: '#7748D8 !important',
    color: '#ffffff !important'
  }
}))

export default useStyles
