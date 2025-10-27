import { colors, theme, typography } from '@static/theme'
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
      padding: '12px 16px',
      height: showInfo ? 264 : 79
    },

    [theme.breakpoints.down('sm')]: {
      padding: '12px 8px'
    }
  },

  info: {
    visibility: showInfo ? 'visible' : 'hidden',
    width: '100%'
  },
  symbolsWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 40
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
  imageWrapper: {
    position: 'relative',
    display: 'flex'
  },
  imageToWrapper: {
    position: 'relative',
    display: 'flex'
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: 'max-content',
    gap: 8,
    [theme.breakpoints.down('md')]: {
      visibility: showInfo ? 'visible' : 'hidden',
      justifyContent: 'flex-end',
      width: 137,
      marginLeft: 7,
      gap: 3
    },
    [theme.breakpoints.down('sm')]: {
      gap: 8,
      marginLeft: 0,
      gridColumn: 'span 3',
      width: '100%',
      justifyContent: 'flex-end'
    }
  },
  actionButton: {
    height: 32,
    width: 32,
    background: 'none',
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
    },
    [theme.breakpoints.down('sm')]: {
      height: 28,
      width: 28
    }
  },
  tokenIcon: {
    minWidth: 24,
    maxWidth: 24,
    height: 24,
    marginRight: 3,
    borderRadius: '50%',
    ':last-of-type': {
      marginRight: 4,
      [theme.breakpoints.down(650)]: {
        marginRight: 4
      }
    },
    [theme.breakpoints.down('sm')]: {
      ':last-of-type': {
        marginRight: 4
      }
    }
  },
  warningIcon: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: -6,
    right: 0
  },
  clipboardIcon: {
    marginLeft: 4,
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
  apyLabel: {
    position: 'relative',
    display: 'inline-block',
    ...typography.body2,
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    }
  },
  aprLabel: {
    ...typography.caption4,
    position: 'absolute',
    top: '100%',
    left: '100%',
    color: colors.invariant.textGrey,
    transform: 'translate(4px, -14px)'
  },
  apyValue: {
    position: 'relative',
    display: 'inline-block',
    ...typography.heading4,
    [theme.breakpoints.down('sm')]: {
      ...typography.body1
    }
  },
  aprValue: {
    position: 'absolute',
    top: '100%',
    left: '100%',
    color: colors.invariant.textGrey,
    transform: 'translate(4px, -14px)',
    ...typography.caption1
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
  favouriteButton: {
    cursor: 'pointer',
    flexShrink: 0
  },
  poolAddress: {
    maxWidth: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...typography.heading4,

    [theme.breakpoints.down('sm')]: {
      ...typography.body1
    }
  }
}))
