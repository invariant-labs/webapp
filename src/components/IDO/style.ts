import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'
import { nth } from 'lodash'

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
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  leftGrid: {
    maxwidth: '408px',
    minWidth: '336 px',
    borderRadius: '10px',
    maxHeight: '340px',
    display: 'flex',
    flexDirection: 'column',
    background: colors.invariant.componentOut4,
    [theme.breakpoints.down('xs')]: {
      width: '336px',
      alignSelf: 'center'
    }
  },
  leftTitle: {
    minWidth: '288px',
    marginLeft: '24px',
    marginTop: '14px',
    marginBottom: '20px',
    ...typography.heading3,
    color: colors.white.main
  },
  leftImputGrid: {
    minWidth: '288px',
    maxWidth: '360px',
    margin: '0px 24px',
    alignSelf: 'center',
    color: colors.white.main
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
    minWidth: '288px',
    maxWidth: '360px',
    alignSelf: 'start',
    marginLeft: '24px',
    color: colors.white.main
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
  leftDepositedWrapper3: {},
  leftLogo: {
    width: '38px',
    height: '29px',
    marginTop: '16px',
    marginRight: '16px'
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
    maxWidth: '360px',
    minWidth: '288px',
    display: 'flex',
    margin: '36px 24px 24px 24px',
    borderRadius: '5px'
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minWidth: '216px',
    maxWidth: '240px',
    borderRadius: '10px',
    marginLeft: '16px',
    backgroundColor: colors.invariant.componentOut4,
    // '& :nth-child(odd)': {
    //   backgroundColor: colors.invariant.componentIn2
    // },
    [theme.breakpoints.down('xs')]: {
      minWidth: '336px',
      marginTop: '24px',
      marginLeft: '0px',
      alignSelf: 'center'
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
