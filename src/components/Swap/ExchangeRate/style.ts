import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  rateText: {
    color: colors.invariant.lightGrey,
    textAlign: 'right',
    ...newTypography.caption4,
    lineHeight: '24px',
    display: 'flex',
    justifyContent: 'center',
    whiteSpace: 'nowrap'
  },
  loadingContainer: {
    display: 'grid',
    width: 20,
    padding: '6px 15px 6px 15px',
    justifyContent: 'center'
  },
  loading: {
    width: 15,
    zIndex: 10,
    margin: '0 auto'
  }
}))

export default useStyles
