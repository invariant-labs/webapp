import { makeStyles } from '@material-ui/core/styles'
import { colors, theme, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  rateText: {
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      ...typography.tiny2
    }
  },
  loadingContainer: {
    width: 20,
    paddingInline: 15,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  loading: {
    width: 15,
    zIndex: 10,
    marginTop: 6
  },
  ableToHover: {
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: '10px',
    paddingInline: 15,
    cursor: 'pointer',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
}))

export default useStyles
