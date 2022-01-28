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
    padding: 24,
    backgroundColor: colors.invariant.component,
    borderRadius: '24px',
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: 410
    }
  },
  selectTokenHeader: {
    width: '100%',
    paddingBottom: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectTokenTitle: {
    fontSize: 20,
    fontWeight: 700
  },
  inputControl: {
    width: '100%',
    position: 'relative'
  },
  selectTokenClose: {
    position: 'absolute',
    top: 30,
    right: 22,
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
      backgroundColor: 'transparent'
    }
  },
  selectTokenInput: {
    backgroundColor: colors.invariant.newDark,
    width: '100%',
    fontSize: 16,
    fontWeight: 600,
    position: 'relative',
    color: 'white',
    border: 'none',
    borderRadius: 20,
    padding: '18px 10px 17px 15px',
    marginBottom: 15,
    '&::placeholder': {
      color: colors.invariant.light,
      fontSize: 16,
      fontFamily: 'Mukta',
      fontWeight: 400
    },
    '&:focus': {
      outline: 'none'
    }
  },
  inputIcon: {
    position: 'absolute',
    width: 24,
    height: 26,
    right: '28px',
    top: '14px'
  },
  commonTokens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingBottom: 14,
    borderBottom: '1px solid #3A466B'
  },
  commonTokensHeader: {
    ...typography.body2
  },
  commonTokensList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  commonTokenItem: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.invariant.newDark,
    borderRadius: 12,
    padding: '6px 12px',
    margin: '5px 10px 5px 0px',
    '&:hover': {
      background: colors.invariant.light
    },
    '& p': {
      ...typography.body2
    }
  },
  commonTokenIcon: {
    width: 24,
    height: 24,
    background: 'radial-gradient(#9AC8E9, #5B8DC8)',
    borderRadius: '50%',
    marginRight: '8px'
    // boxShadow: '0px 0px 5px rgba(216, 255, 181, 0.5)'
  },
  tokenList: {
    borderRadius: 10,
    background: colors.invariant.component,
    width: 451,
    height: 352,
    padding: '8px 0',
    overflowY: 'hidden'
  },
  tokenItem: {
    margin: '0 0 2px 0',
    borderRadius: 24,
    width: 431,
    height: 70,
    cursor: 'pointer',
    '&:hover': {
      background: colors.invariant.light
    }
  },
  tokenName: {
    color: colors.white.main,
    ...typography.heading4,
    fontWeight: 700,
    lineHeight: '20px',
    fontSize: '24px'
  },
  tokenDescrpiption: {
    color: colors.invariant.lightGrey,
    ...typography.label1,
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    fontSize: '14px'
  },
  tokenIcon: {
    width: 36,
    height: 36,
    marginLeft: 6,
    marginRight: 14,
    borderRadius: '50%'
  },
  tokenBalance: {
    ...typography.subtitle2,
    color: colors.invariant.lightGrey,
    fontSize: 16,
    fontWeight: 400,
    whiteSpace: 'nowrap'
  },
  searchIcon: {
    color: colors.invariant.light,
    margin: 10
  },
  hideScroll: {
    '& > *:first-child': {
      paddingRight: '20px'
    }
  },
  scrollbarThumb: {
    background: colors.invariant.pink,
    borderRadius: 10,
    width: 5
  },
  scrollbarTrack: {
    background: colors.invariant.newDark,
    borderRadius: 10,
    height: '98%',
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
