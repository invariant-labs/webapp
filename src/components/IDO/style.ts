import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: '20px',
    color: colors.white.main
  },
  header: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    }
  },
  gridWrapper: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  leftGrid: {
    width: '408px',
    borderRadius: '10px',
    maxHeight: '340px',
    display: 'flex',
    flexDirection: 'column',
    background: colors.invariant.componentOut4,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '336px',
      alignSelf: 'center'
    }
  },
  leftTitle: {
    marginLeft: '24px',
    marginTop: '14px',
    marginBottom: '30px',
    ...typography.heading3,
    color: colors.white.main,
    [theme.breakpoints.down('xs')]: {
      width: '288px'
    }
  },
  leftImputGrid: {
    width: '360px',
    alignSelf: 'center',
    color: colors.white.main,
    [theme.breakpoints.down('xs')]: {
      width: '288px'
    }
  },
  amountInput: {
    border: `1px solid ${colors.invariant.componentOut2}`
  },
  leftImputTxt: {
    ...typography.body3,
    color: colors.invariant.lightInfoText
  },
  leftImputTxtBold: {
    fontWeight: 600
  },
  leftDepositedWrapper: {
    width: '360px',
    alignSelf: 'center',
    color: colors.white.main,
    [theme.breakpoints.down('xs')]: {
      width: '288px'
    }
  },
  leftDepositedTxt: {
    marginTop: '14px',
    marginLeft: '24px',
    ...typography.body3,
    lineHeight: '5px',
    color: colors.invariant.lightInfoText
  },
  leftDepositedWrapper2: {
    display: 'flex',
    flexDirection: 'row'
  },
  leftDepositedWrapper3: {
    width: '85%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  leftLogo: {
    width: '38px',
    height: '29px',
    marginTop: '16px',
    marginRight: '8px'
  },
  leftDepositedValueTxt: {
    marginTop: '8px',
    ...typography.heading4,
    color: colors.white.main
  },
  leftDepositedValue: {
    ...typography.label2,
    lineHeight: '4px',
    color: colors.invariant.lightInfoText
  },
  leftConnectBtn: {
    width: '360px',
    display: 'flex',
    marginTop: '36px',
    marginBottom: '24px',
    alignSelf: 'center',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      width: '288px'
    }
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '240px',
    borderRadius: '10px',
    marginLeft: '16px',
    background: colors.invariant.componentOut4,
    [theme.breakpoints.down('xs')]: {
      minWidth: '336px',
      marginTop: '24px',
      marginLeft: '0px',
      alignSelf: 'center'
    },
    '@media (min-width: 601px) and (max-width: 700px)': {
      width: '216px',
      marginLeft: '16px'
    }
  },
  rightGridBoxOdd: {
    height: '68px',
    textAlign: 'center'
  },
  rightGridBoxEven: {
    height: '68px',
    textAlign: 'center',
    backgroundColor: colors.invariant.componentIn2
  },
  rightGridTxt: {
    height: '40%',
    fontSize: '14px',
    color: colors.invariant.lightInfoText
  },
  rightGridIcons1: {
    width: '15px',
    height: '15px',
    color: colors.white.main
  },
  rightGridIcons2: {
    width: '21px',
    height: '16px'
  },
  rightGridValues: {
    marginLeft: '8px',
    ...typography.heading4,
    color: colors.white.main
  }
}))
