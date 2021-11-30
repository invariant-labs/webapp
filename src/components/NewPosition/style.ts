import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 882
  },
  back: {
    height: 24,
    marginBottom: 18,
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: colors.invariant.lightInfoText,
    WebkitPaddingBefore: '2px',
    ...newTypography.body2
  },
  title: {
    color: colors.white.main,
    ...newTypography.heading4,
    marginBottom: 18
  },
  row: {
    position: 'relative',

    '& .noConnectedLayer': {
      height: '100%'
    }
  }
}))

export default useStyles
