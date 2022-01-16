import { createTheme } from '@material-ui/core/styles'

export const colors = {
  black: {
    full: '#000000',
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
    violetWeak: '#562cb2',
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
    body1: typography.body1,
    body2: typography.body2,
    body3: typography.body3,
    subtitle1: typography.subtitle1,
    subtitle2: typography.subtitle2,
    caption: typography.caption1,
    label1: typography.label1,
    label2: typography.label2,
    label3: typography.label3
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
