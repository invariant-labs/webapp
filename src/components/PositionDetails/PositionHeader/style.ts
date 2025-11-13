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
    gap: 16,
    flexDirection: 'row',
    [theme.breakpoints.down(1040)]: {
      flexDirection: 'column'
    }
  },
  poolStats: {
    '&:hover': {
      filter: 'brightness(1.4)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'brightness(1)'
      }
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    height: 28,
    flexDirection: 'row',
    [theme.breakpoints.down(432)]: {
      flexDirection: 'column',
      height: 'auto'
    }
  },
  navigationSide: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center'
  },
  upperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 464,
    [theme.breakpoints.down(1040)]: {
      width: 'auto'
    }
  },
  lowerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    flexGrow: 1,
    [theme.breakpoints.down(688)]: {
      flexGrow: 'none'
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
    borderRadius: '100%',
    height: 36,
    width: 36,
    [theme.breakpoints.down(1040)]: {
      height: 28,
      width: 28
    }
  },
  reverseTokensIcon: {
    cursor: 'pointer',
    color: colors.invariant.lightGrey,
    '&:hover': {
      filter: 'brightness(1.4)',
      '@media (hover: none)': {
        filter: 'brightness(1)'
      }
    }
  },
  tickerContainer: {
    color: colors.white.main,
    ...typography.heading3,
    [theme.breakpoints.down(1040)]: {
      ...typography.heading4
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
    height: 14,

    '&:hover': {
      filter: 'brightness(1.4)',
      '@media (hover: none)': {
        filter: 'brightness(1)'
      }
    }
  },
  marketIdLabelContainer: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      lineHeight: 0
    }
  },
  tabletNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    width: 'calc(100% - 480px)'
  }
}))
