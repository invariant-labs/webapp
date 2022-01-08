import { makeStyles } from '@material-ui/core'

const leftContainerWidthDesk: string = '408px'
const leftContainerHeightDesk: string = '340px'
const leftContainerWidthMob: string = '336px'
const leftInsideWidthDesk: string = '360px'

const leftInsideWidthTitle: string = '340px'
const leftInsideWidthMob: string = '288px'
const rightContainerWidthDesk: string = '240px'
const rightContainerWidthMob: string = '336px'
const rightElementHeightDesk: string = '68px'
const colorLight: string = 'white'
const colorDark: string = '#7F768F'
const backgroundColorDark: string = '#9DD46D'
const backgroundColorDarker: string = '#1C1B1E'

export const useStyles = makeStyles({
  idoTitle: {
    color: colorLight,
    fontSize: '20px',
       width: '230px',
    maxHeight: '12px'
    // paddingBottom: '28px'
  },
  idoWrapper: {
    color: 'primary'
    // display: 'flex',
    // flexDirection: 'row',
    // '@media (max-width: 780px)': {
    //   flexDirection: 'column',
    //   justifyContent: 'flex-end'
    // }
  },
  leftGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: leftContainerWidthDesk,
    borderRadius: '10px',
    maxHeight: leftContainerHeightDesk,
    maxWidth: leftContainerWidthDesk,
    background: '#222126',
    // marginRight: '10px',
    '@media (max-width: 780px)': {
      maxWidth: leftContainerWidthMob,
      // marginBottom: '20px',
      // marginRight: '0px'
    }
  },
  // idoLeftTitle: {
  //   width: '230px',
  //   maxHeight: '12px',
  //   fontSize: '20px'
  // },
  idoLeftTitle: {
    width: leftInsideWidthTitle,
    // alignSelf: 'center',
    marginLeft: '24px',
    color: colorLight,
    '@media (max-width: 780px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftDeposit: {
      width: leftInsideWidthDesk,
    alignSelf: 'center',
    color: colorLight,
    '@media (max-width: 780px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftAmountInput: {
    // width: leftInsideWidthDesk,
    // height: '63px',
    // paddingLeft: '16px'
    marginBottom: '0px',
    border: '1px solid #34303B'
  },
  idoLeft12: {
    width: '17px',
    height: '17px'
    // paddingTop: '10px'
  },
  idoLeft121: {
    width: '22px',
    height: '16px'
    // paddingTop: '10px'
  },
  idoLeft21: {
  },
  idoLeft211: {
    fontSize: '14px',
    color: colorDark
  },
  idoLeft222: {
    fontSize: '30px',
    color: colorDark
  },
  idoLeft223: {
    backgroundColor: backgroundColorDark,
    height: '32px',
    padding: '7px 0',
    color: '#1C1B1E',
    // fontWeight: '400',
    borderRadius: '3px',
    minWidth: '55px'
  },
  idoLeft3: {
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    color: colorLight,
    '@media (max-width: 780px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeft31: {
    fontSize: '14px',
    color: colorDark
  },
  idoLeft32: {
    width: leftInsideWidthDesk,
    display: 'flex',
    flexDirection: 'row'
  },
  idoLeft33: {
    height: '24px',
    width: '50px',
    paddingTop: '10px'
    // color: colorDark
  },
  idoLeft34: {
    paddingLeft: '10px'
  },
  idoLeft35: {
    color: colorLight
  },
  idoLeft36: {
    width: '85%',
    lineHeight: '0px'
  },
  idoLeft361: {
    fontSize: '14px',
    color: colorDark
  },
  idoLeft4: {
    display: 'flex',
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    borderRadius: '5px',
    '@media (max-width: 780px)': {
      width: leftInsideWidthMob
    }
  },
  rightGrid: {
    width: rightContainerWidthDesk,
    borderRadius: '10px',
    // height: '340px',
    background: '#222126',
    '@media (max-width: 780px)': {
      width: rightContainerWidthMob
    }
  },
  rightGrid1: {
    textAlign: 'center',

    height: rightElementHeightDesk
  },
  rightGrid11: {
    color: colorDark,
    fontSize: '14px',
    height: '40%'
  },
  rightGrid12: {
    fontSize: '20px',
    color: colorLight
  },
  rightGrid2: {
    textAlign: 'center',

    backgroundColor: '#1C1B1E',
    height: rightElementHeightDesk
  },
  rightGrid3: {
    textAlign: 'center',
    height: rightElementHeightDesk
  },
  rightGrid4: {
    textAlign: 'center',
    backgroundColor: backgroundColorDarker,
    height: rightElementHeightDesk
  },
  rightGrid5: {
    height: rightElementHeightDesk,
    textAlign: 'center'
  }
})
