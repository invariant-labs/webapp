import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '70vh',
    marginTop: '65px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '336px',
    boxSizing: 'border-box',

    '@media (min-width: 600px)': {
      width: '568px'
    },

    '@media (min-width: 960px)': {
      width: '664px'
    }
  },
  header: {
    paddingBottom: '9px',
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  idoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '704px',
    justifyContent: 'space-between',

    '@media (min-width: 600px)': {
      height: '340px',
      flexDirection: 'row'
    }
  },
  main: {
    background: colors.invariant.componentOut1,
    width: '336px',
    height: '340px',
    padding: '12px 24px 24px 24px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '@media (min-width: 960px)': {
      width: '408px'
    }
  },
  mainHeader: {
    ...typography.heading3,
    color: colors.white.main,
    marginBottom: '10px',
    boxSizing: 'border-box'
  },
  amountInput: {
    background: colors.invariant.componentIn2,
    color: colors.white.main,
    borderRadius: '5px',
    padding: '8px 15px',
    fontSize: '30px',
    fontWeight: 'normal',
    width: '100%',
    marginBottom: '16px',
    transition: 'all .4s',
    height: '63px',
    outline: 'none'
  },
  maxButton: {
    fontSize: '16px',
    color: colors.invariant.componentIn2,
    minWidth: '55px',
    height: '32px',
    fontWeight: 400,
    borderRadius: '3px',
    padding: '7px 0',
    marginLeft: '8px',
    backgroundColor: colors.invariant.accent2,

    '&:hover': {
      boxShadow: '0px 0px 20px -8px white'
    }
  },
  selectButton: {
    textTransform: 'none',
    boxShadow: 'none',
    height: '30px',
    borderRadius: '3px',
    fontSize: '16px',
    minWidth: '80px',
    background: colors.invariant.componentOut2,
    marginRight: '8px',
    padding: '2px 10px',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: colors.invariant.componentOut3
    }
  },
  tokenComponentTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tokenComponentText: {
    ...typography.body3,
    color: colors.invariant.lightInfoText
  },
  amountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '40px'
  },
  amountIconBox: {
    width: '54px',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },

  amountIcon: {
    width: '37.59px',
    height: '28.34px'
  },
  amountBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '306px',
    height: '100%'
  },
  amountMainText: {
    fontWeight: 600,
    fontSize: '20px',
    color: colors.white.main
  },
  amountLineBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0 8px',
    width: '100%'
  },
  singleAmountText: {
    fontWeight: 400,
    fontSize: '12px',
    color: colors.invariant.lightInfoText
  },
  button: {
    height: '44px',
    borderRadius: '5px',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '40px',
    background: colors.invariant.accent1,
    color: colors.white.main,
    transition: 'background 0ms ease',
    marginTop: '36px',

    '&:hover': {
      background: colors.invariant.accent1,
      boxShadow: '0px 0px 20px -10px white'
    }
  },
  sideSection: {
    background: colors.invariant.componentOut1,
    width: '336px',
    height: '340px',
    borderRadius: '10px',
    '& >:hover': {
      background: colors.invariant.componentOut2
    },

    '& >:first-child': {
      borderRadius: '10px 10px 0px 0px'
    },

    '& >:last-child': {
      borderRadius: '0px 0px 10px 10px'
    },

    '& >:nth-child(2n)': {
      background: colors.invariant.componentIn2
    },

    '& >:nth-child(2n):hover': {
      background: colors.invariant.componentOut1
    },

    '@media (min-width: 600px)': {
      width: '216px'
    },

    '@media (min-width: 960px)': {
      width: '240px'
    }
  },
  singleSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '6px',
    paddingBottom: '2px',
    width: '100%',
    height: '68px',
    boxSizing: 'border-box'
  },
  singleSectionHeader: {
    ...typography.body3,
    color: colors.invariant.lightInfoText
  },
  singleSectionText: {
    ...typography.heading4,
    color: colors.white.main
  },
  iconWithTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clockIcon: {
    width: '15px',
    height: '15px',
    marginRight: '8px'
  },
  tokenIcon: {
    width: '20px',
    height: '20px',
    marginRight: '8px'
  },
  logoIcon: {
    width: '21px',
    height: '16px',
    marginRight: '8px'
  }
}))

export default useStyles
