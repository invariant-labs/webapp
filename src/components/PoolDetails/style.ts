import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    maxWidth: 1210,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  upperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 24,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  back: {
    height: 24,
    alignItems: 'center',
    marginBottom: 18,
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(2)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: colors.invariant.lightHover,
    WebkitPaddingBefore: '2px',
    ...typography.body2
  }
}))

export default useStyles
