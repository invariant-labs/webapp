import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
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

    [theme.breakpoints.down('xs')]: {
      width: 15
    }
  },
  text: {
    ...typography.body1,
    color: colors.invariant.lightInfoText,
    backgroundColor: colors.invariant.componentOut2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    maxHeight: 35,
    padding: '4px 0px 3px 0px',
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
    justifyContent: 'space-between'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '3px',
    alignItems: 'center'
  },
  feeText: {
    minWidth: 90,

    [theme.breakpoints.down('xs')]: {
      minWidth: 84
    }
  },
  closedText: {
    width: '100px',
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
    color: colors.white.main,
    lineHeight: '35px',

    [theme.breakpoints.down('xs')]: {
      ...typography.body1
    }
  },
  bottomGrid: {
    background: colors.invariant.componentOut4,
    marginTop: 20,
    padding: 24,
    borderRadius: '10px'
  },
  iconSmall: {
    width: '16px',
    marginRight: 5,
    borderRadius: '100%'
  },
  boxInfo: {
    backgroundColor: colors.invariant.componentIn2,
    borderRadius: '8px',
    padding: 20,
    '&:not(:last-child)': {
      marginBottom: 24
    }
  },
  title: {
    ...typography.body1,
    color: colors.white.main
  },
  titleValue: {
    ...typography.heading3,
    color: colors.white.main,
    fontFamily: 'Mukta'
  },
  violetButton: {
    backgroundColor: colors.invariant.accent1,
    borderRadius: '5px',
    textTransform: 'none',
    color: colors.white.main,
    minWidth: 140,
    maxHeight: 35,
    ...typography.body1,
    '&:hover': {
      background: colors.invariant.accent1,
      boxShadow: `0 0 15px ${colors.invariant.accent1}`
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.label2,
      maxHeight: 28,
      minWidth: 105
    }
  },
  tokenGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  tokenArea: {
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  token: {
    backgroundColor: colors.invariant.componentOut3,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3px 12px'
  },
  tokenName: {
    color: colors.white.main,
    ...typography.body1
  },
  tokenValue: {
    color: colors.invariant.lightInfoText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
    ...typography.body1
  },
  closeButton: {
    color: colors.invariant.componentOut2,
    background: colors.invariant.accent2,
    maxHeight: '35px',
    minWidth: 114,
    textTransform: 'none',
    transition: '300ms',
    paddingInline: 0,
    '&:hover': {
      background: colors.invariant.accent2,
      boxShadow: `0px 0px 15px ${colors.invariant.accent2}`
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.label2,
      minWidth: 84
    }
  },
  iconText: {
    paddingRight: 10,
    paddingBottom: 3,
    width: 19,
    height: 19
  }
}))

export default useStyles
