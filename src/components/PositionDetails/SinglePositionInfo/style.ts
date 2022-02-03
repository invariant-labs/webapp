import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

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
    marginRight: 8,
    marginLeft: 8,

    [theme.breakpoints.down('xs')]: {
      width: 15,
      marginRight: 2,
      marginLeft: 2
    }
  },
  text: {
    ...newTypography.body1,
    color: colors.invariant.textGrey,
    backgroundColor: colors.invariant.component,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
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
    justifyContent: 'space-between'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
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
    ...newTypography.heading3,
    color: colors.invariant.text,
    lineHeight: '28px',

    [theme.breakpoints.down('xs')]: {
      ...newTypography.heading4
    }
  },
  bottomGrid: {
    background: colors.invariant.component,
    marginTop: 20,
    padding: 24,
    borderRadius: '24px'
  },
  iconSmall: {
    width: '20px',
    height: '20px',
    marginRight: 8,
    borderRadius: '100%'
  },
  boxInfo: {
    borderRadius: '16px',
    '&:not(:last-child)': {
      marginBottom: 26
    }
  },
  title: {
    ...newTypography.heading4,
    color: colors.invariant.text
  },
  titleValue: {
    ...newTypography.heading3,
    color: colors.invariant.text,
    fontFamily: 'Mukta'
  },
  violetButton: {
    background: colors.invariant.pinkLinearGradient,
    borderRadius: '11px',
    textTransform: 'none',
    color: colors.invariant.dark,
    width: 116,
    height: 32,
    ...newTypography.body1,
    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`
    },
    '&:disabled': {
      backgroundColor: colors.invariant.componentOut3,
      color: colors.invariant.background2
    },

    [theme.breakpoints.down('xs')]: {
      ...newTypography.body1,
      maxHeight: 28,
      minWidth: 105
    }
  },
  tokenGrid: {
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
    borderRadius: '16px',
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
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 13px'
  },
  tokenName: {
    color: colors.invariant.textGrey,
    ...newTypography.heading4,
    fontWeight: 400
  },
  tokenValue: {
    color: colors.invariant.textGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...newTypography.heading2
  },
  tokenBalance: {
    color: '#A9B6BF',
    ...newTypography.caption2
  },
  tokenUSDValue: {
    color: '#A9B6BF',
    ...newTypography.caption2
  },
  closeButton: {
    color: colors.invariant.dark,
    background: colors.invariant.greenLinearGradient,
    height: 36,
    width: '116px',
    textTransform: 'none',
    transition: '300ms',
    paddingInline: 0,
    borderRadius: '12px',
    ...newTypography.body1,

    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      boxShadow: `0px 0px 8px ${colors.invariant.green}`
    },

    [theme.breakpoints.down('xs')]: {
      width: 84,
      fontSize: 12
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
