import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const leftContainerWidthDesk: string = '408px'
const leftContainerHeightDesk: string = '340px'
const containerWidthMob: string = '336px'
const leftInsideWidthDesk: string = '360px'
const leftInsideWidthMob: string = '288px'
const rightContainerWidthDesk: string = '240px'
const rightContainerWidth700: string = '216px'
const rightElementHeightDesk: string = '68px'

const colorTextLight: string = colors.white.main
const colorTextDark: string = colors.invariant.lightInfoText
const colorInputBorder: string = colors.invariant.componentOut2
const backgroundColor: string = colors.invariant.componentOut4
const backgroundcolorTextDarker: string = colors.invariant.componentIn2

const fontSizeSmall: string = '12px'
const fontSizeMedium: string = '14px'
const fontSizeLarge: string = '20px'
const fontSizeXL: string = '25px'

const gapX1: string = '8px'
const gapX2: string = '16px'
const gapX3: string = '24px'
const gapX4: string = '36px'
const gapX5: string = '40px'

export const useStyles = makeStyles((theme: Theme) => ({
  idoTitle: {
    color: colorTextLight,
    fontSize: fontSizeLarge
  },
  idoHeader: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...typography.heading4,
      color: colorTextLight
    }
  },
  idoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${gapX2}`
    }
  },
  idoGridWrapper: {
    flexDirection: 'row',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  idoLeftGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: leftContainerWidthDesk,
    borderRadius: '10px',
    maxHeight: leftContainerHeightDesk,
    maxWidth: leftContainerWidthDesk,
    background: backgroundColor,
    '@media (max-width: 600px)': {
      maxWidth: containerWidthMob,
      alignSelf: 'center'
    },
    '@media (max-width: 700px)': {
      width: containerWidthMob
    }
  },
  idoLeftTitle: {
    lineHeight: '20px',
    marginLeft: gapX3,
    marginTop: gapX3,
    marginBottom: gapX5,
    fontSize: fontSizeXL,
    color: colorTextLight,
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftBalance: {
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    color: colorTextLight,
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoAmountInput: {
    border: `1px solid ${colorInputBorder}`,
    marginBottom: gapX3
  },
  idoLeftAmountWrapper: {
  },
  idoLeftAmount: {
    fontSize: fontSizeMedium,
    color: colorTextDark,
    fontWeight: 400
  },
  idoLeftAmountBold: {
    fontWeight: 600
  },
  idoLeftDepositWrapper: {
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    color: colorTextLight,
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoLeftDepositedTxt: {
    fontSize: fontSizeMedium,
    color: colorTextDark,
    marginLeft: gapX3
  },
  idoLeftDepositWrapper2: {
    display: 'flex',
    flexDirection: 'row'
  },
  idoLeftLogo: {
    width: '41px',
    height: '32px',
    marginTop: gapX1,
    marginRight: gapX2
  },
  idoLeftDepositWrapper3: {
  },
  idoLeftDepositValue1: {
    color: colorTextLight,
    fontSize: fontSizeLarge
  },
  idoLeftDepositWrapper3: {
    width: '85%',
    '@media (max-width: 700px)': {
      width: '100%'
    }
  },
  idoLeftDepositValues: {
    lineHeight: 0,
    fontSize: fontSizeSmall,
    color: colorTextDark
  },
  idoLeftConnectBtn: {
    display: 'flex',
    marginTop: gapX4,
    marginBottom: gapX3,
    width: leftInsideWidthDesk,
    alignSelf: 'center',
    borderRadius: '5px',
    '@media (max-width: 700px)': {
      width: leftInsideWidthMob
    }
  },
  idoRightGrid: {
    width: rightContainerWidthDesk,
    borderRadius: '10px',
    marginLeft: gapX2,
    background: backgroundColor,
    '@media (max-width: 600px)': {
      minWidth: containerWidthMob,
      marginTop: gapX3,
      marginLeft: '0px',
      alignSelf: 'center'
    },
    '@media (min-width: 601px) and (max-width: 700px)': {
      width: rightContainerWidth700,
      marginLeft: gapX2

    }
  },
  idoRightGridTxt: {
    color: colorTextDark,
    fontSize: fontSizeMedium,
    height: '40%'
  },
  // rightGrid12: {
  //   fontSize: fontSizeLarge,
  //   color: colorTextLight
  // },
  idoRightGridIcons1: {
    width: '15px',
    height: '15px',
    color: colorTextLight

  },
  idoRightGridIcons2: {
    width: '21px',
    height: gapX2
  },
  idoRightGridValues: {
    fontSize: fontSizeLarge,
    marginLeft: gapX1,
    color: colorTextLight
  },
  rightGridBox1: {
    textAlign: 'center',

    height: rightElementHeightDesk
  },
  rightGridBox2: {
    textAlign: 'center',
    backgroundColor: backgroundcolorTextDarker,
    height: rightElementHeightDesk
  },
  rightGrid3: {
    textAlign: 'center',
    height: rightElementHeightDesk
  },
  rightGrid4: {
    textAlign: 'center',
    backgroundColor: backgroundcolorTextDarker,
    height: rightElementHeightDesk
  },
  rightGrid5: {
    height: rightElementHeightDesk,
    textAlign: 'center'
  }
}))
