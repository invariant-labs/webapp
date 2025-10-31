import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
    minHeight: 642,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  container: {
    flex: 1,
    background: colors.invariant.component,
    padding: 24,
    borderRadius: 24,
    marginTop: 16,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    [theme.breakpoints.down('sm')]: {
      padding: '24px 8px'
    }
  },
  header: {
    ...typography.heading4,
    color: colors.invariant.text
  },
  separator: {
    borderBottom: `1px solid ${colors.invariant.light}`,
    width: '100%',
    margin: '24px 0'
  },
  refreshIconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    marginRight: 7,
    '&:hover': {
      background: 'none'
    },
    '&:disabled': {
      opacity: 0.5
    },
    [theme.breakpoints.down('sm')]: {}
  },
  refreshIcon: {
    width: 26,
    height: 21,
    cursor: 'pointer',
    transition: 'filter 300ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  favouriteButton: {
    cursor: 'pointer'
  }
}))

export default useStyles
