import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: 1210, //merge

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  header: {
    paddingBottom: 16,
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
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
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-end',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
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
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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

    '&:not(:last-child)': {
      display: 'block'
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
  },
  switchPoolsContainer: {
    position: 'relative',
    width: 'fit-content',
    backgroundColor: colors.invariant.component,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'inline-flex',
    height: 38,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8
    }
  },
  switchPoolsMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    transition: 'all 0.3s ease',
    zIndex: 1
  },
  switchPoolsButtonsGroup: { position: 'relative', zIndex: 2, display: 'flex' },
  switchPoolsButton: {
    ...typography.body2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flex: 1,
    textTransform: 'none',
    border: 'none',
    borderRadius: 10,
    zIndex: 2,
    '&.Mui-selected': {
      backgroundColor: 'transparent'
    },
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'transparent'
    },
    '&:disabled': {
      color: colors.invariant.componentBcg,
      pointerEvents: 'auto',
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 'none',
        cursor: 'not-allowed',
        filter: 'brightness(1.15)',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    letterSpacing: '-0.03em',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  disabledSwitchButton: {
    color: `${colors.invariant.textGrey} !important`
  }
}))
