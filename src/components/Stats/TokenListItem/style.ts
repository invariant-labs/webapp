import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
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
    gridTemplateColumns: '5% 35% 17.5% auto 12.5% 60px',
    padding: '18px 24px',
    borderBottom: `1px solid ${colors.invariant.light}`,
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
      gridTemplateColumns: 'auto 140px 80px 120px'
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto 100px 80px 60px',
      padding: '18px 8px',

      '& p': {
        ...typography.caption1
      }
    }
  },

  tokenList: {
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
    paddingRight: 5,

    '& p': {
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

    transition: 'filter 0.2s linear',

    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
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
  }
}))
