import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 258px)',
    marginLeft: 'calc(50vw - 231px)',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  container: {
    overflow: 'hidden',
    padding: 15,
    backgroundColor: colors.invariant.component,
    borderRadius: 20,
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100vw'
    }
  },
  selectTokenHeader: {
    width: '100%',
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputControl: {
    width: '100%',
    position: 'relative'
  },
  selectTokenClose: {
    minWidth: 0,
    height: 20,
    '&:after': {
      content: '"\u2715"',
      fontSize: 22,
      position: 'absolute',
      color: 'white',
      top: '50%',
      right: '0%',
      transform: 'translateY(-50%)'
    },
    '&:hover': {
      backgroundColor: '#1B191F'
    }
  },
  selectTokenInput: {
    backgroundColor: colors.invariant.newDark,
    width: '100%',
    fontSize: 16,
    fontWeight: 600,
    position: 'relative',
    color: 'white',
    border: `1px solid ${colors.invariant.newDark}`,
    borderColor: colors.invariant.newDark,
    borderRadius: 15,
    padding: '18px 10px 17px 10px',
    marginBottom: 7,
    '&::placeholder': {
      color: colors.invariant.light,
      ...newTypography.body1
    },
    '&:focus': {
      outline: 'none'
    }
  },
  inputIcon: {
    position: 'absolute',
    width: 24,
    height: 26,
    right: '12px',
    top: '14px'
  },
  commonTokens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingBottom: 14
  },
  commonTokensHeader: {
    ...typography.body2
  },
  commonTokensList: {
    display: 'flex',
    flexFlow: 'row wrap'
  },

  commonTokenItem: {
    minWidth: 'auto',
    display: 'flex',
    cursor: 'default',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${colors.invariant.newDark}`,
    borderColor: colors.invariant.newDark,
    background: colors.invariant.newDark,
    borderRadius: 15,
    padding: '4px 10px 2px 15px',
    marginTop: 7,
    marginRight: 7,
    '& p': {
      ...typography.body2
    },

    '&:hover': {
      border: `1px solid ${colors.invariant.light}`,
      background: colors.invariant.light
    }
  },
  commonTokenIcon: {
    width: 18,
    height: 18,
    margin: '0 6px 2px 0',
    borderRadius: '50%',
    boxShadow: '0px 0px 5px rgba(216, 255, 181, 0.5)'
  },
  tokenList: {
    background: colors.invariant.component,
    borderTop: `1px solid ${colors.invariant.light}`,
    width: 451,
    height: 352,
    paddingTop: 10
  },

  tokenContainer: {
    display: 'flex',
    flexDirection: 'column'
  },

  tokenItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 2px 0',
    borderRadius: 10,
    width: 431,
    height: 40,
    cursor: 'pointer',
    padding: 12,
    '& > p': {
      whiteSpace: 'nowrap'
    },

    '&:hover': {
      background: colors.invariant.light,
      borderRadius: 25
    }
  },
  tokenName: {
    color: colors.white.main,
    ...newTypography.heading4,
    lineHeight: '20px'
  },
  tokenDescrpiption: {
    color: colors.invariant.lightGrey,
    ...newTypography.caption4,
    lineHeight: '16px',
    whiteSpace: 'nowrap'
  },
  tokenBalanceStatus: {
    filter: 'brightness(0.8)',
    color: colors.invariant.lightGrey,
    ...newTypography.caption2,
    minWidth: 'auto'
  },

  tokenIcon: {
    width: 30,
    height: 30,
    marginRight: 40,
    borderRadius: '50%',
    boxShadow: '0px 0px 10px rgba(216, 255, 181, 0.5)'
  },

  hideScroll: {
    '& > *:first-child': {
      paddingRight: '30px'
    }
  },

  scrollbarThumb: {
    background: colors.invariant.pink,
    borderRadius: 10,
    width: 5
  },
  scrollbarTrack: {
    background: '#111931',
    borderRadius: 10,
    height: '98%',
    margin: 5,
    float: 'right',
    width: 5
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 456
  },

  clearIcon: {
    minWidth: 12,
    height: 12,
    marginLeft: 8,
    cursor: 'pointer'
  },
  dualIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content'
  },
  secondIcon: {
    marginLeft: -15,
    marginRight: 14
  },
  button: {
    ...typography.body2,
    padding: 0,
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 5,
    backgroundColor: colors.invariant.component,
    color: colors.invariant.textGrey,
    height: 26,
    width: '100%',
    textAlign: 'center',
    marginTop: 4,
    '&:hover': {
      backgroundColor: colors.invariant.light,
      boxShadow: 'none',
      color: colors.white.main
    },
    '&:hover span': {
      color: colors.white.main
    }
  },
  filterList: {
    borderRadius: 5,
    background: colors.invariant.component,
    minWidth: 100,
    height: 102,
    padding: 4
  },
  filterListText: {
    borderRadius: 5,
    background: colors.invariant.component,
    minWidth: 115,
    height: 102,
    padding: 4
  },
  filterItem: {
    margin: '2px 0',
    borderRadius: 5,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: colors.invariant.component
    }
  },
  filterItemText: {
    margin: '2px 0',
    borderRadius: 5,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: colors.invariant.light
    }
  },
  filterNameText: {
    position: 'absolute',
    left: 6,
    color: colors.invariant.textGrey,
    ...typography.body2
  },
  filterName: {
    color: colors.invariant.textGrey,
    position: 'absolute',
    left: 28,
    ...typography.body2
  },
  filterIcon: {
    width: 10,
    height: 10,
    position: 'absolute',
    left: 5,
    top: 8
  },
  popoverSort: {
    background: 'transparent',
    boxShadow: 'none',
    minWidth: 102,
    position: 'absolute'
  }
}))

export default useStyles
