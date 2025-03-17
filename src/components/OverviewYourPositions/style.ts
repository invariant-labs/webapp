import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

export const useStyles = makeStyles()(() => ({
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
    [theme.breakpoints.down('lg')]: {
      marginBottom: 32
    },
    [theme.breakpoints.down('md')]: {
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
    paddingRight: 16
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24px',
    width: '100%'
  },
  switchPoolsContainer: {
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
    ...typography.heading4,
    fontWeight: 500
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
  switchPoolsButtonsGroup: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    width: '100%'
  },
  switchPoolsButton: {
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
    paddingLeft: 32,
    paddingRight: 32
  },
  filtersContainer: {
    display: 'none',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  disabledSwitchButton: {
    color: `${colors.invariant.textGrey} !important`
  },
  footerCheckboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  checkBoxLabel: {
    '.MuiFormControlLabel-label': {
      ...typography.body2,
      color: `${colors.invariant.text}b6`
    }
  },
  footerText: { ...typography.body2 },
  footerPositionDetails: {
    ...typography.body2
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
      fontSize: 25
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
