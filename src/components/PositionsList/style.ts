import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
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
    flexWrap: 'wrap',
    rowGap: '8px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    }
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 48
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
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',
    transition: '300ms',

    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)',
      '@media (hover: none)': {
        background:
          'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',
        boxShadow: 'none'
      }
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  fullWidthWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 8,
      flexDirection: 'row-reverse'
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
    background: `${colors.invariant.light} !important`,
    display: 'flex',
    '&:hover': {
      filter: 'brightness(1.15)',
      '@media (hover: none)': {
        filter: 'none'
      }
    },
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1
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
    width: '100%',

    '&:not(:last-child)': {
      display: 'block',
      marginBottom: 20,

      [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('sm')]: {
      marginRight: 16
    }
  },
  refreshIcon: {
    width: 26,
    height: 21,
    cursor: 'pointer',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  titleMobileContainer: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center'
  }
}))
