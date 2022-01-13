import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 258px)',
    marginLeft: 'calc(50vw - 231px)',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'calc(50vw - 206px)'
    }
  },
  container: {
    padding: 30,
    backgroundColor: colors.invariant.componentOut4,
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: 410
    }
  },
  selectTokenHeader: {
    width: '100%',
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputControl: {
    width: '100%',
    position: 'relative'
  },
  selectTokenClose: {
    position: 'absolute',
    top: 15,
    right: 12,
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
    backgroundColor: colors.invariant.componentIn1,
    width: '100%',
    fontSize: 16,
    fontWeight: 600,
    position: 'relative',
    color: 'white',
    border: '1px solid',
    borderColor: colors.invariant.componentOut2,
    borderRadius: 5,
    padding: '18px 10px 17px 10px',
    marginBottom: 15,
    '&::placeholder': {
      color: colors.invariant.componentOut3,
      fontSize: 16,
      fontWeight: 600
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
    display: 'flex'
  },
  commonTokenItem: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor: colors.invariant.componentOut2,
    borderRadius: 3,
    padding: '7px 7px 2px 7px',
    marginRight: 10,
    '& p': {
      ...typography.body2
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
    borderRadius: 10,
    background: colors.invariant.componentIn1,
    width: 451,
    height: 352,
    padding: 8,
    overflowY: 'hidden'
  },
  tokenItem: {
    margin: '0 0 2px 0',
    borderRadius: 10,
    width: 431,
    height: 70,
    cursor: 'pointer',
    padding: '9px 0px 9px 12px',

    '&:hover': {
      background: colors.invariant.componentOut2
    }
  },
  tokenName: {
    color: colors.white.main,
    ...typography.heading4,
    lineHeight: '20px'
  },
  tokenDescrpiption: {
    color: colors.white.main,
    ...typography.label1,
    lineHeight: '16px',
    whiteSpace: 'nowrap'
  },
  tokenIcon: {
    width: 30,
    height: 30,
    marginLeft: 6,
    marginRight: 14,
    borderRadius: '50%',
    boxShadow: '0px 0px 10px rgba(216, 255, 181, 0.5)'
  },
  tokenBalance: {
    ...typography.subtitle2,
    color: colors.invariant.componentIn1,
    whiteSpace: 'nowrap'
  },
  searchIcon: {
    color: colors.invariant.componentOut3,
    margin: 10
  },
  hideScroll: {
    '& > *:first-child': {
      paddingRight: '20px'
    }
  },
  scrollbarThumb: {
    background: colors.invariant.accent1,
    borderRadius: 10,
    width: 5
  },
  scrollbarTrack: {
    background: '#2D2932',
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
    backgroundColor: colors.invariant.componentOut1,
    height: 26,
    width: '100%',
    textAlign: 'center',
    marginTop: 4,
    '&:hover': {
      backgroundColor: colors.invariant.componentOut2,
      boxShadow: 'none',
      color: colors.white.main
    },
    '&:hover span': {
      color: colors.white.main
    }
  },
  filterList: {
    borderRadius: 5,
    background: colors.invariant.componentOut1,
    minWidth: 100,
    height: 102,
    padding: 4,
    overflowY: 'hidden'
  },
  filterListText: {
    borderRadius: 5,
    background: colors.invariant.componentOut1,
    minWidth: 115,
    height: 102,
    padding: 4,
    overflowY: 'hidden'
  },
  filterItem: {
    margin: '2px 0',
    borderRadius: 5,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: colors.invariant.componentOut1
    }
  },
  filterItemText: {
    margin: '2px 0',
    borderRadius: 5,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: colors.invariant.componentOut1
    }
  },
  filterNameText: {
    position: 'absolute',
    left: 6,
    color: colors.invariant.lightInfoText,
    ...typography.body2
  },
  filterName: {
    color: colors.invariant.lightInfoText,
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
