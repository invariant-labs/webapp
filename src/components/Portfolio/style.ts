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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  titleBar: {
    display: 'flex',
    marginBottom: 16
  },
  title: {
    color: colors.invariant.text,
    ...typography.heading4
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
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row-reverse',
      gap: theme.spacing(1)
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
    flex: 1
  },
  itemLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    width: '100%',

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
    transition: 'filter 300ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  titleMobileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  disabledSwitchButton: {
    color: `${colors.invariant.textGrey} !important`
  },
  footer: {
    maxWidth: 1201,
    height: 48,
    width: '100%',
    borderTop: `1px solid ${colors.invariant.light}`,
    display: 'flex',
    justifyContent: 'space-between',
    background: colors.invariant.component,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    [theme.breakpoints.down(850)]: {
      borderRadius: 16,
      border: 'none',
      marginTop: 8
    }
  },
  footerItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,

    [theme.breakpoints.down('sm')]: {
      padding: '0px 8px'
    }
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '72px',
    width: '100%'
  },
  switchPoolsContainerOverview: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    height: 32,
    marginBottom: '16px'
  },
  overviewHeaderTitle: {
    color: colors.invariant.text,
    ...typography.heading4
  },

  switchPoolsButtonsGroupOverview: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    width: '100%'
  },
  switchPoolsButtonOverview: {
    ...typography.body2,
    display: 'flex',
    textWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flex: 1,
    textTransform: 'none',
    border: 'none',
    borderRadius: 10,
    zIndex: 2,
    width: '50%',
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
      transition: 'all 0.3s',
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
    paddingLeft: 32,
    paddingRight: 32
  },
  filtersContainerOverview: {
    display: 'none',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },

  footerCheckboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 6
  },
  checkBoxLabel: {
    '.MuiFormControlLabel-label': {
      ...typography.body2,
      fontSize: 15,

      color: `${colors.invariant.text}b6`
    }
  },
  footerText: { ...typography.body2, fontSize: 15 },
  footerPositionDetails: {
    ...typography.body2,
    fontSize: 15
  },
  whiteText: {
    color: colors.invariant.text
  },
  greenText: {
    color: `${colors.invariant.green}b2`
  },
  pinkText: {
    color: `${colors.invariant.pink}b2`
  },
  greyText: {
    color: colors.invariant.textGrey
  },
  checkBox: {
    width: 25,
    height: 25,
    marginLeft: 3,
    marginRight: 3,
    color: colors.invariant.newDark,
    '&.Mui-checked': {
      color: colors.invariant.green
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20
    },
    padding: 0,
    '& .MuiIconButton-label': {
      width: 20,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    }
  }
}))
