import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,

    display: 'flex',
    flexDirection: 'column'
    // justifyContent: 'space-between'
  },
  iconsGrid: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: 35,
    borderRadius: '100%',

    [theme.breakpoints.down('xs')]: {
      width: 22
    }
  },
  arrowIcon: {
    width: 22,
    marginRight: 8,
    marginLeft: 8,

    [theme.breakpoints.down('xs')]: {
      width: 15,
      marginRight: 2,
      marginLeft: 2
    }
  },
  text: {
    ...typography.body1,
    color: colors.invariant.lightGrey,
    backgroundColor: colors.invariant.component,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    width: '100%'
  },
  rangeGrid: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      marginTop: 16
    }
  },
  feeText: {
    marginLeft: 12,
    minWidth: 90,

    [theme.breakpoints.down('xs')]: {
      minWidth: 84
    }
  },
  closedText: {
    width: 100,
    paddingRight: 0
  },
  namesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    '& #pause': {
      padding: ' 0px 3px'
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: 4
    }
  },
  name: {
    ...typography.heading3,
    color: colors.invariant.text,
    lineHeight: '28px',

    [theme.breakpoints.down('xs')]: {
      ...typography.heading4
    }
  },
  bottomGrid: {
    background: colors.invariant.component,
    marginTop: 20,
    padding: 24,
    borderRadius: 24,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconSmall: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: '100%'
  },
  boxInfo: {
    borderRadius: 16,
    position: 'relative',
    '&:not(:last-child)': {
      marginBottom: 26
    }
  },
  title: {
    ...typography.heading4,
    color: colors.invariant.text
  },
  titleValue: {
    ...typography.heading3,
    color: colors.invariant.text,
    fontFamily: 'Mukta'
  },
  violetButton: {
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 11,
    textTransform: 'none',
    color: colors.invariant.dark,
    width: 116,
    height: 32,
    ...typography.body1,
    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: '0px 0px 16px rgba(46, 224, 154, 0.35)'
    },
    '&:disabled': {
      background: colors.invariant.light,
      color: colors.invariant.dark
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.body1,
      maxHeight: 28,
      minWidth: 105
    }
  },
  tokenGrid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    '&:not(:last-child)': {
      paddingTop: 24
    }
  },
  tokenArea: {
    backgroundColor: colors.invariant.dark,
    borderRadius: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  tokenAreaUpperPart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tokenAreaLowerPart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16
  },
  token: {
    backgroundColor: colors.invariant.light,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 13px'
  },
  tokenName: {
    color: colors.white.main,
    ...typography.heading4,
    fontWeight: 400
  },
  tokenValue: {
    color: colors.invariant.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...typography.heading2
  },
  tokenBalance: {
    color: '#A9B6BF',
    ...typography.caption2
  },
  tokenUSDValue: {
    color: '#A9B6BF',
    ...typography.caption2
  },
  closeButton: {
    color: colors.invariant.dark,
    background: colors.invariant.greenLinearGradientOpacity,
    height: 36,
    width: 116,
    textTransform: 'none',
    transition: '300ms',
    paddingInline: 0,
    borderRadius: 12,
    ...typography.body1,

    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      boxShadow: '0px 0px 16px rgba(46, 224, 154, 0.35)'
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 10
    },

    [theme.breakpoints.down('xs')]: {
      width: '50%',
      ...typography.caption1,
      height: 40
    }
  },
  button: {
    color: colors.invariant.black,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 12,
    height: 40,
    width: 130,
    paddingRight: 9,
    paddingLeft: 9,
    letterSpacing: -0.03,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      ...typography.caption1
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px',
    [theme.breakpoints.down('xs')]: {
      WebkitPaddingBefore: 0
    }
  },
  buttons: {
    width: ' 100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  iconText: {
    paddingRight: 10,
    paddingBottom: 3,
    width: 19,
    height: 19
  },
  arrowsIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 'calc(50% - 8px)',
    left: 'calc(50% - 16px)',
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  cover: {
    width: '100%',
    height: 'calc(100% - 12px)',
    background: `${colors.invariant.black}dd`,
    position: 'absolute',
    borderRadius: 10,
    zIndex: 1
  },
  loader: {
    height: 50,
    width: 50,
    margin: 'auto'
  }
}))

export default useStyles
