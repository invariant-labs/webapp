import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: '#1C1C1C',
    color: '#746E7C',
    borderRadius: 5,
    padding: 17,
    fontSize: 30,
    fontWeight: 'normal',
    width: '100%',
    marginBottom: 24
  },
  maxButton: {
    fontSize: 16,
    color: '#1C1C1C',
    width: 84,
    height: 40,
    fontWeight: 400,
    borderRadius: 3,
    padding: '7px 0',
    backgroundColor: '#9DD46D',
    background: 'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)'
  },
  select: {
    marginRight: 20
  },
  input: {
    paddingTop: 4,
    '&:focus': {
      color: '#FFFFFF'
    }
  },
  label: {
    top: -1
  }
}))

export default useStyles
