import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ showInfo?: boolean }>()((_theme, { showInfo = false }) => ({
  container: {
    transition: 'all 0.3s',
    rowGap: 12,
    color: colors.white.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    whiteSpace: 'nowrap',
    borderBottom: `1px solid ${colors.invariant.light}`,
    overflow: 'hidden',
    flexDirection: 'row',
    height: showInfo ? 145 : 79,
    background: showInfo ? colors.invariant.darkGradient : colors.invariant.component,

    [theme.breakpoints.down('md')]: {
      padding: '12px 16px'
    },

    [theme.breakpoints.down('sm')]: {
      padding: '12px 8px'
    }
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingBottom: 12,

    borderBottom: '4px solid transparent',
    borderImage: `repeating-linear-gradient(
      to right,
      ${colors.invariant.light} 0,
      ${colors.invariant.light} 8px,
      transparent 8px,
      transparent 24px
    )`,
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0'
  },
  info: {
    visibility: showInfo ? 'visible' : 'hidden',
    width: '100%'
  },
  extendedRowIcon: {
    justifySelf: 'end',
    alignSelf: 'center',
    display: 'flex',
    height: 24,
    padding: 0,
    width: 20,
    fontSize: 10,
    cursor: 'pointer',
    fill: colors.invariant.green,
    transition: 'all 0.3s ease',
    transform: showInfo ? 'rotate(180deg)' : 'rotate(0deg)'
  },
  tokenSymbol: {
    color: colors.invariant.textGrey,
    fontWeight: 400
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -4
    }
  },
  imageContainer: {
    position: 'relative',
    display: 'flex'
  },

  tokenIcon: {
    minWidth: 28,
    maxWidth: 28,
    height: 28,
    marginRight: 8,
    borderRadius: '50%'
  },
  warningIcon: {
    position: 'absolute',
    width: 12,
    bottom: -3,
    right: 3
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8
  },
  actionButton: {
    height: 32,
    background: 'none',
    width: 32,
    padding: 0,
    margin: 0,
    border: 'none',

    color: colors.invariant.black,
    textTransform: 'none',

    transition: 'filter 0.3s linear',

    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  clipboardIcon: {
    width: 18,
    cursor: 'pointer',
    color: colors.invariant.lightHover,
    '&:hover': {
      color: colors.invariant.text,

      '@media (hover: none)': {
        color: colors.invariant.lightHover
      }
    }
  },
  favouriteButton: {
    cursor: 'pointer'
  }
}))
