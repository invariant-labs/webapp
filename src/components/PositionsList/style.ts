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
    paddingBottom: 28
  },
  title: {
    color: colors.invariant.text,
    ...newTypography.heading4,
    fontWeight: 700

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
  searchRoot: {
    width: '100%'
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  searchBar: {
    width: 221,
    height: 32,
    padding: '7px 12px',
    borderRadius: 10,
    background: colors.invariant.black,
    border: '1px solid #202946',
    color: colors.invariant.lightGrey,
    ...newTypography.body2,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200
    }
  },
  button: {
    ...newTypography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    color: colors.invariant.dark,
    borderRadius: 14,
    height: 40,
    minWidth: 130,
    paddingInline: 0,
    marginLeft: 16,
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: '0px 0px 16px rgba(239, 132, 0, 0.35)'
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
