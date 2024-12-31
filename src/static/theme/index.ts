import { createTheme } from '@mui/material/styles'

export const colors = {
  black: {
    full: '#000000',
    background: '#1B1C2A',
    light: '#090B1B',
    kinda: '#1A1A1A',
    greyish: '#081323',
    cinder: '#0E0C12',
    controls: '#44424E',
    header: '#1A1D28',
    card: '#28242E'
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
    charade: '#272735',
    deep: '#4B5983'
  },
  green: {
    main: '#00F9BB',
    button: '#40BFA0',
    hover: 'rgba(0,249,187,0.15)',
    pastel: '#8AF7E4',
    snackbar: '#4BB724',
    shine: '#AEE57E'
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
    warning: '#EFD063',
    pink: '#EF84F5',
    lightPink: '#f29df7',
    violet: '#9C3EBD',
    green: '#2EE09A',
    dark: '#040B22',
    newDark: '#111931',
    component: '#202946',
    componentBcg: '#111931',
    light: '#3A466B',
    lightHover: '#A9B6BF',
    black: '#010514',
    textGrey: '#A9B6BF',
    lightGrey: '#bac7d1',
    text: '#FFFFFF',
    Error: '#FB555F',
    greenLinearGradient: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
    greenLinearGradientOpacity:
      'linear-gradient(180deg, rgba(46, 224, 154, 0.8) 0%, rgba(33, 164, 124, 0.8) 100%)',
    pinkLinearGradient: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
    pinkLinearGradientOpacity:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',
    yellow: '#EFD063',
    blue: '#43BBFF',
    transparentBcg: 'rgba(1, 5, 20, 0.25)',
    bodyBackground: '#141b2d',
    plotGreen: '#9DD46D',
    plotRed: '#FB555F'
  }
}

export const typography = {
  heading1: {
    fontSize: 32,
    lineHeight: '36px',
    fontWeight: 700
  },
  heading2: {
    fontSize: 28,
    lineHeight: '32px',
    fontWeight: 700
  },
  heading3: {
    fontSize: 24,
    lineHeight: '28px',
    fontWeight: 700
  },
  heading4: {
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 700
  },
  body1: {
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 700
  },
  body2: {
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 400
  },
  body3: {
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 400
  },
  caption1: {
    fontSize: 14,
    lineHeight: '17px',
    fontWeight: 700
  },
  caption2: {
    fontSize: 14,
    lineHeight: '17px',
    fontWeight: 400
  },
  caption3: {
    fontSize: 12,
    lineHeight: '15px',
    fontWeight: 700
  },
  caption4: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400
  },
  tiny1: {
    fontSize: 10,
    lineHeight: '13px',
    fontWeight: 700
  },
  tiny2: {
    fontSize: 10,
    lineHeight: '13px',
    fontWeight: 400
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.navy.button,
      contrastText: colors.navy.veryLightGrey
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
    caption: typography.caption1
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1950
    }
  }
})
