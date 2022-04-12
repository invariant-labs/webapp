import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

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
    marginBottom: 20
  },
  title: {
    color: colors.invariant.text,
    ...typography.heading4,
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
    ...typography.body2,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200
    }
  },
  button: {
    color: colors.invariant.dark,
    ...typography.body1,
    textTransform: 'none',
    borderRadius: 14,
    height: 40,
    minWidth: 130,
    paddingInline: 0,
    marginLeft: 16,
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',

    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)'
    }
  },

  buttonSelectDisabled: {
    ...typography.body1,
    textTransform: 'none',
    borderRadius: 14,
    height: 40,
    minWidth: 130,
    paddingInline: 0,
    cursor: 'auto',
    marginLeft: 16,
    background: `${colors.invariant.light} !important`,

    '&:hover': {
      filter: 'brightness(1.15)'
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  noPositionsText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.invariant.text
  },
  list: {
    position: 'relative',
    flex: 1
  },
  itemLink: {
    textDecoration: 'none',
    cursor: 'pointer',

    '&:not(:last-child)': {
      display: 'block',
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 16
      }
    }
  },
  searchIcon: {
    width: 17
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  placeholder: {
    margin: 'auto'
  }
}))

export default useStyles
