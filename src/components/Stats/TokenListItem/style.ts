import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
    maxWidth: '100%',
    '&:nth-of-type(odd)': {
      background: `${colors.invariant.component}`
    },
    '&:nth-of-type(even)': {
      background: colors.invariant.componentDark
    },
    '&:first-child': {
      borderBottom: `1px solid ${colors.invariant.light}`,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      background: colors.invariant.component
    }
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 34% 17.5% auto 12.5% 60px',
    padding: '18px 24px',
    borderBottom: `1px solid ${colors.invariant.light}`,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '30% 22.5% 32.5% 15%',
      padding: '18px 8px',

      '& p': {
        ...typography.caption1
      }
    }
  },

  tokenList: {
    alignItems: 'center',
    color: colors.white.main,
    '& p': {
      ...typography.heading4
    },

    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption1
      }
    }
  },

  header: {
    '& p.MuiTypography-root': {
      ...typography.heading4,
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',

      [theme.breakpoints.down('sm')]: {
        ...typography.caption2,
        fontWeight: 600
      }
    }
  },

  tokenName: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& p': {
      paddingRight: 12,
      maxWidth: 'calc(100% - 80px);',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
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
    minWidth: 28,
    maxWidth: 28,
    height: 28,
    marginRight: 8,
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
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
    height: 12,
    bottom: -6,
    right: -6
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
  }
}))
