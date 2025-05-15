import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    maxWidth: '100%',
    '&:nth-of-type(odd)': {
      background: `${colors.invariant.component}`
    },
    '&:nth-of-type(even)': {
      background: colors.invariant.componentDark
    },
    '&:first-of-type': {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      background: colors.invariant.component,
      borderBottom: `2px solid ${colors.invariant.light}`
    }
  },

  container: {
    height: 69,
    color: colors.white.main,
    display: 'grid',
    gridTemplateColumns: '30px auto 160px 80px 140px 100px 160px',
    padding: '18px 24px',
    whiteSpace: 'nowrap',

    '& p': {
      ...typography.heading4,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    '& p:last-child': {
      justifyContent: 'flex-end'
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'auto 140px 100px 80px 120px'
    },

    '@media (max-width: 780px)': {
      gridTemplateColumns: 'auto 100px 140px 80px'
    },

    [theme.breakpoints.down('sm')]: {
      height: 69,
      gridTemplateColumns: 'auto 60px 60px 60px',
      padding: '24px 8px',

      '& p': {
        justifyContent: 'flex-start',
        ...typography.caption1
      }
    }
  },

  containerNoAPY: {
    gridTemplateColumns: '30px auto 80px 140px 100px 160px',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'auto 100px 80px 120px'
    },

    '@media (max-width: 780px)': {
      gridTemplateColumns: 'auto 100px 140px 80px'
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto 80px 80px 60px',

      '& p': {
        justifyContent: 'flex-start',
        ...typography.caption1
      }
    }
  },

  imageContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  iconsWrapper: {
    display: 'flex',
    height: 28
  },

  header: {
    height: '69px',
    '& p.MuiTypography-root': {
      color: colors.invariant.textGrey,
      ...typography.heading4,
      fontWeight: 600,

      [theme.breakpoints.down('sm')]: {
        ...typography.caption2,
        fontWeight: 600
      }
    }
  },

  symbolsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    paddingRight: 5,

    '& p': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'block'
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      justifyContent: 'flex-start'
    }
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -4
    }
  },
  activeLiquidityIcon: {
    marginLeft: 5,
    height: 14,
    width: 14,
    border: '1px solid #FFFFFF',
    color: colors.invariant.text,
    borderRadius: '50%',
    fontSize: 10,
    lineHeight: '10px',
    fontWeight: 400,
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: 1,
    cursor: 'pointer'
  },
  liquidityTooltip: {
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    maxWidth: 350,
    boxSizing: 'border-box'
  },
  liquidityTitle: {
    color: colors.invariant.text,
    ...typography.heading4,
    marginBottom: 8
  },
  liquidityDesc: {
    color: colors.invariant.text,
    ...typography.caption1
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
  iconContainer: {
    minWidth: 24,
    maxWidth: 24,
    height: 24,
    marginRight: 3,
    position: 'relative'
  },
  tokenIcon: {
    minWidth: 24,
    maxWidth: 24,
    height: 24,
    marginRight: 3,
    borderRadius: '50%'
  },
  warningIcon: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: -6,
    right: -6
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
  row: {
    display: 'flex',
    gap: 4,
    fontSize: 30,
    height: 32
  },
  apy: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: colors.invariant.textGrey
  }
}))
