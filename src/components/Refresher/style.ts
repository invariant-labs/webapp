import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  ring: {
    cursor: 'pointer'
  },
  innerCircle: {
    transition: '0.35s stroke-dashoffset',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%'
  }
}))

export default useStyles
