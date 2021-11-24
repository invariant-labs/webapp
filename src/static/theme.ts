import { createTheme } from '@material-ui/core/styles'

export const colors = {
  black: {
    background: '#1B1C2A', // v2.0
    light: '#090B1B',
    kinda: '#1A1A1A',
    greyish: '#081323',
    cinder: '#0E0C12', // v2.0 background color
    controls: '#44424E', // v2.0 controls background color
    header: '#1A1D28', // v2.0 header
    card: '#28242E' // v2.0 card color
  },
  blue: {
    accent: '#072E5A',
    subtle: 'rgba(7,46,90,0.1)',
    deepAccent: 'rgba(7,46,90,0.5)',
    base: '#0B2545',
    light: '#66AFF5',
    neon: '#08F7FE',
    astel: '#48ADF1',
    bastille: '#1E1A23',
    charade: '#272735' // v2.0 component
  },
  gray: {
    base: '#8DA9C4',
    skeletonBackground: '#8E8B8B',
    skeletonField: '#C4C4C4', // v2.0 primary text color
    CDCDCD: '#CDCDCD',
    gunPowder: '#44424F',
    C4: '#C4C4C4',
    DB: '#DBDBDB', // v2.0 header button text
    manatee: '#898B9C', // v2.0 secondary text color
    balticSea: 'rgba(40, 36, 46, 0.6)', // v2.0 secondary background
    santas: '#9DA0AE', // v2.0 choose-token scrollbar track
    C7C9D1: '#C7C9D1', // v2.0 navbar text
    veryLight: '#E3E4E8', // v2.0 highlighted font
    light: '#9DA0AE', // v2.0 text
    mid: '#4C4C67', // v2.0
    upperMid: '#343446', // v2.0
    dark: '#1E202E', // v2.0 backgrounds
    background: '#1C1C29', // v2.0
    component: '#272735' // v2.0
  },
  green: {
    main: '#00F9BB',
    button: '#40BFA0',
    hover: 'rgba(0,249,187,0.15)',
    pastel: '#8AF7E4',
    snackbar: '#4BB724'
  },
  white: {
    main: '#FFFFFF'
  },
  red: {
    main: '#EB5757',
    error: '#C52727',
    neon: '#FF2079',
    pinkish: '#FE53BB',
    snackbar: '#DE3232'
  },
  purple: {
    magenta: '#A1045A',
    orchid: '#AF69EF',
    pastel: '#C6BDEA'
  },
  yellow: {
    neon: '#F5D300'
  },
  navy: {
    // colors with suffix "2" on figma
    background: '#0C0D2C',
    dark: '#0E0E2A',
    component: '#1D1D49',
    navBar: 'rgba(249, 249, 251, 0.76)',
    navButton: '#3A3A85',
    grey: '#A3A8CE',
    lightGrey: '#DADCF1',
    veryLightGrey: '#FBFBFB',
    button: '#655ED4',
    info: '#6261A3',
    darkGrey: '#292956',
    tooltip: '#5B54CE',
    '5756B3': '#5756B3',
    '807ADC': '#807ADC'
  },
  invariant: {
    violetStrong: '#3d00cc',
    violetWeak: '#562cb2',
    violetButton: '#7748D8',
    violetGray: '#7b6e8c',
    yellowGray: '#919575',
    yellowWeak: '#abc35a',
    yellowStrong: '#c3f43e',
    logoGreen: '#9CE75A',
    logoPurple: '#7748D8',
    background2: '#0B090D',
    accent1: '#7748D8',
    accent2: '#9DD46D',
    componentOut1: '#27262B',
    componentOut2: '#34303B',
    componentOut3: '#4D4757',
    componentOut4: '#222126',
    componentIn1: '#171717',
    componentIn2: '#1C1B1E',
    lightInfoText: '#7F768F',
    darkInfoText: '#1C1D1C',
    error: '#DB5757',
    warning: '#EFD063'
  }
}

export const typography = {
  heading1: {
    fontSize: 40,
    lineHeight: '49px',
    fontWeight: 800
  },
  heading2: {
    fontSize: 32,
    lineHeight: '40px',
    fontWeight: 800
  },
  heading3: {
    fontSize: 27,
    lineHeight: '35px',
    fontWeight: 800
  },
  heading4: {
    fontSize: 24,
    lineHeight: '33px',
    fontWeight: 800
  },
  heading5: {
    fontSize: 20,
    lineHeight: '30px',
    fontWeight: 600
  },
  body1: {
    fontSize: 22,
    lineHeight: '30px',
    fontWeight: 800
  },
  body2: {
    fontSize: 22,
    lineHeight: '30px',
    fontWeight: 600
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 800
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600
  },
  body3: {
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 800
  },
  body4: {
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600
  },
  caption1: {
    fontSize: 11,
    lineHeight: '16px',
    fontWeight: 600
  },
  caption2: {
    fontSize: 11,
    lineHeight: '16px',
    fontWeight: 800
  },
  caption3: {
    fontSize: 9,
    lineHeight: '14px',
    fontWeight: 600
  },
  caption4: {
    fontSize: 9,
    lineHeight: '14px',
    fontWeight: 800
  }
}

export const newTypography = {
  heading1: {
    fontSize: 30,
    lineHeight: '50px',
    fontWeight: 700
  },
  heading2: {
    fontSize: 30,
    lineHeight: '50px',
    fontWeight: 400
  },
  heading3: {
    fontSize: 25,
    lineHeight: '40px',
    fontWeight: 600
  },
  heading4: {
    fontSize: 20,
    lineHeight: '35px',
    fontWeight: 600
  },
  heading5: {
    fontSize: 20,
    lineHeight: '30px',
    fontWeight: 600
  },
  body1: {
    fontSize: 16,
    lineHeight: '28px',
    fontWeight: 600
  },
  body2: {
    fontSize: 16,
    lineHeight: '28px',
    fontWeight: 400
  },
  body3: {
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 400
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 800
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600
  },
  body4: {
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600
  },
  caption1: {
    fontSize: 11,
    lineHeight: '16px',
    fontWeight: 600
  },
  caption2: {
    fontSize: 11,
    lineHeight: '16px',
    fontWeight: 800
  },
  caption3: {
    fontSize: 9,
    lineHeight: '14px',
    fontWeight: 600
  },
  caption4: {
    fontSize: 9,
    lineHeight: '14px',
    fontWeight: 800
  },
  label1: {
    fontSize: 12,
    lineHeight: '24px',
    fontWeight: 400
  },
  label2: {
    fontSize: 12,
    lineHeight: '24px',
    fontWeight: 600
  },
  label3: {
    fontSize: 10,
    lineHeight: '24px',
    fontWeight: 400
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.navy.button, // v2.0
      contrastText: colors.navy.veryLightGrey // v2.0
    },
    secondary: {
      main: colors.green.button,
      contrastText: colors.navy.background
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#030313'
    },
    error: {
      main: '#E15757'
    }
  },
  typography: {
    fontFamily: 'Mukta',
    fontWeightRegular: 600,
    h1: typography.heading1,
    h2: typography.heading2,
    h3: typography.heading3,
    h4: typography.heading4,
    body1: typography.body2,
    subtitle1: typography.subtitle1,
    subtitle2: typography.subtitle2,
    body2: typography.body4,
    caption: typography.caption1,
    newTypography: {
      fontFamily: 'Mukta',
      fontWeightRegular: 600,
      h1: newTypography.heading1,
      h2: newTypography.heading2,
      h3: newTypography.heading3,
      h4: newTypography.heading4,
      body1: newTypography.body1,
      body2: newTypography.body2,
      body3: newTypography.body3,
      subtitle1: newTypography.subtitle1,
      subtitle2: newTypography.subtitle2,
      caption: newTypography.caption1,
      label1: newTypography.label1,
      label2: newTypography.label2,
      label3: newTypography.label3
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        MozAppearance: 'textfield',
        '&::-webkit-clear-button, &::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          display: 'none'
        }
      }
    }
  }
})
