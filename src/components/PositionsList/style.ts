import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 1122,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  header: {
    paddingBottom: 16,
    display: 'flex',
    alignItems: 'flex-end'
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20
  },
  title: {
    color: colors.invariant.text,
    ...newTypography.heading4,
    fontWeight: 500
  },
  positionsNumber: {
    width: 28,
    height: 28,
    color: colors.invariant.text,
    background: colors.invariant.light,
    marginLeft: 8,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar: {
    width: 221,
    height: 32,
    padding: '7px 12px',
    borderRadius: 10,
    background: colors.invariant.black,
    border: '1px solid #202946',
    color: colors.invariant.light,
    ...newTypography.body2
  },
  button: {
    color: colors.invariant.dark,
    ...newTypography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradient,
    borderRadius: 14,
    height: 40,
    width: 130,
    paddingInline: 0,

    '&:hover': {
      background: colors.invariant.pink,
      boxShadow: `0 0 15px ${colors.invariant.pink}`
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  noPositionsText: {
    ...newTypography.heading1,
    textAlign: 'center',
    color: colors.invariant.text
  },
  list: {
    position: 'relative'
  },
  itemLink: {
    textDecoration: 'none',

    '&:not(:last-child)': {
      display: 'block',
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 16
      }
    }
  }
}))

export default useStyles
