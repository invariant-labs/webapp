import { colors, makeStyles } from '@material-ui/core'
import { theme, typography } from '@static/theme'

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
      //  width: '230px',
    // maxHeight: '12px'
    // paddingBottom: '28px'
  },
    header: {
   display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...typography.heading4,
      color: 'white'
    }
  },
  idoWrapper: {
    display: 'flex',
    letterSpacing: '-0.03em',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    }
  },
  idoGridWrapper: {
    flexDirection: 'row',
        '@media (max-width: 600px)': {
    flexDirection: 'column',
      // marginBottom: '20px',
      // marginRight: '0px'
    }
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
    '@media (max-width: 600px)': {
      maxWidth: leftContainerWidthMob,
      // marginBottom: '20px',
      // marginRight: '0px'
    },
         '@media (max-width: 700px)': {
      width: '336px'
      // marginTop: '24px',
    // marginLeft: '16px'

    }
  },
  // idoLeftTitle: {
  //   width: '230px',
  //   maxHeight: '12px',
  //   fontSize: '20px'
  // },
  idoLeftTitle: {
    width: leftInsideWidthTitle,
    // display: 'flex',
    // justifyContent: 'center',
    // alignSelf: 'center',
    lineHeight: '0px',
    marginLeft: '24px',
    marginTop: '24px',
    marginBottom: '40px',
    fontSize: '25px',
    fontWeight: 600,
    color: colorLight,
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftDeposit: {
      width: leftInsideWidthDesk,
    alignSelf: 'center',
    color: colorLight,
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftAmountInput: {
    // width: leftInsideWidthDesk,
    // height: '63px',
    // paddingLeft: '16px'
    // border: '1px solid #34303B'
  },
  idoAmountInput: {
    border: '1px solid #34303B',
    marginBottom: '24px'
  }, 
  idoLeft21: {
  },
  idoLeft211: {
    fontSize: '14px',
    color: colorDark,
    fontWeight: 400
  },
  idoLeft211bold: {
    fontWeight: 600
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
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeft31: {
    fontSize: '14px',
    color: colorDark,
    marginLeft: '24px'
  },
  idoLeft32: {
    width: leftInsideWidthDesk,
    display: 'flex',
    flexDirection: 'row'
  },
  idoLeft33: {
    width: '41px',
    height: '32px', 
    marginTop: '9px',
    marginRight: '16px'    
    // color: colorDark
  },
  idoLeft34: {
    // paddingLeft: '10px'
  },
  idoLeft35: {
    color: colorLight,
    fontSize: '20px',
    fontWeight: 600
  },
  idoLeft36: {
    width: '85%',
  '@media (max-width: 700px)': {
      width: '100%'
    }
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-around'
  },
  idoLeft361: {
      lineHeight: 0,
    fontSize: '12px',
    color: colorDark    
  },
  idoLeft4: {
    display: 'flex',
    marginTop: '36px',
    marginBottom: '24px',
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    borderRadius: '5px',
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  rightGrid: {
    width: rightContainerWidthDesk,
    borderRadius: '10px',
    marginLeft: '16px',
    // height: '340px',
    background: '#222126',
    '@media (max-width: 600px)': {
      width: rightContainerWidthMob,
      marginTop: '24px',
          marginLeft: '0px'
    },
     '@media (min-width: 601px) and (max-width: 700px)': {
      width: '216px',
      // marginTop: '24px',
    marginLeft: '16px'

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
   rightGrid12a: {
    width: '15px',
    height: '15px'
    // paddingTop: '10px'
  },
  rightGrid12b: {
    width: '21px',
    height: '16px'
    // paddingTop: '10px'
  },
   rightGrid13: {
     fontSize: '20px',
     fontWeight: '600',
     marginLeft: '8px'
     
    // paddingTop: '10px'
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
