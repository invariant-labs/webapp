import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,

    [theme.breakpoints.up(1040)]: {
      flexDirection: 'row'
    }
  },
  navigation: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,

    [theme.breakpoints.up(432)]: {
      flexDirection: 'row'
    }
  },
  navigationSide: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8
  },
  upperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.up(1040)]: {
      width: 464
    }
  },
  lowerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,

    [theme.breakpoints.up(688)]: {
      flexGrow: 1
    }
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  navigationWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  backContainer: {
    cursor: 'pointer',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(1.4)',
      '@media (hover: none)': {
        filter: 'brightness(1)'
      }
    }
  },
  iconContainer: { display: 'flex', alignItems: 'center', gap: 3 },
  icon: {
    height: 28,
    width: 28,
    borderRadius: '100%',

    [theme.breakpoints.up(1040)]: {
      height: 36,
      width: 36
    }
  },
  reverseTokensIcon: {
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.4)',
      '@media (hover: none)': {
        filter: 'brightness(1)'
      }
    }
  },
  tickerContainer: {
    ...typography.heading4,
    color: colors.white.main,

    [theme.breakpoints.up(1040)]: {
      ...typography.heading3
    }
  },
  feeContainer: {
    height: 40,
    padding: '0 8px',
    background: colors.invariant.component,
    borderRadius: 12,
    ...typography.body1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.invariant.textGrey,
    border: `1px solid ${colors.invariant.component}`
  },
  feeContainerIsActive: {
    color: colors.invariant.green,
    border: `1px solid ${colors.invariant.green}`
  },

  airdropIcon: {
    height: 24
  },
  airdropIconInActive: {
    filter: 'grayscale(100%)'
  },
  backText: {
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  explorerLink: {
    height: 20,
    '& img': {
      height: 14,

      '&:hover': {
        filter: 'brightness(1.4)',
        '@media (hover: none)': {
          filter: 'brightness(1)'
        }
      }
    }
  },
  marketIdLabelContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}))
