import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    background: colors.invariant.component,
    borderRadius: 24,
    padding: 20,
    flexWrap: 'nowrap',

    '&:not(:last-child)': {
      marginBottom: 20
    },

    '&:hover': {
      background: `${colors.invariant.component}B0`
    },

    [theme.breakpoints.down('lg')]: {
      padding: 16,
      flexWrap: 'wrap'
    },
    [theme.breakpoints.down('sm')]: {
      padding: 8
    }
  },
  icons: {
    marginRight: 12,
    width: 'fit-content',

    [theme.breakpoints.down('lg')]: {
      marginRight: 12
    }
  },
  tokenIcon: {
    width: 40,
    borderRadius: '100%',

    [theme.breakpoints.down('sm')]: {
      width: 28
    }
  },
  arrows: {
    width: 36,
    marginLeft: 4,
    marginRight: 4,

    [theme.breakpoints.down('lg')]: {
      width: 30
    },

    [theme.breakpoints.down('sm')]: {
      width: 24
    },

    '&:hover': {
      filter: 'brightness(2)'
    },
    transition: '300ms'
  },
  names: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ...typography.heading2,
    color: colors.invariant.text,
    lineHeight: '40px',
    whiteSpace: 'nowrap',
    width: 180,
    [theme.breakpoints.down('xl')]: {
      ...typography.heading2
    },
    [theme.breakpoints.down('lg')]: {
      lineHeight: '32px',
      width: 'unset'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.heading3,
      lineHeight: '25px'
    }
  },
  infoText: {
    ...typography.body1,
    color: colors.invariant.lightGrey,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      ...typography.caption1,
      padding: '0 4px'
    }
  },
  activeInfoText: {
    color: colors.invariant.black
  },
  greenText: {
    ...typography.body1,
    color: colors.invariant.green,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      ...typography.caption1
    }
  },
  liquidity: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 170,
    marginRight: 8,
    lineHeight: 20,
    paddingInline: 10,
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 0%'
    }
  },
  fee: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 90,
    marginRight: 8,

    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },
  activeFee: {
    background: colors.invariant.green
  },
  infoCenter: {
    flex: '1 1 0%'
  },
  minMax: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 320,
    paddingInline: 10,
    marginRight: 8,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
      marginTop: 8
    }
  },
  value: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 160,
    paddingInline: 12,

    [theme.breakpoints.down('sm')]: {
      width: 144,
      paddingInline: 6
    }
  },
  mdInfo: {
    width: 'fit-content',
    flexWrap: 'nowrap',

    [theme.breakpoints.down('lg')]: {
      flexWrap: 'nowrap',
      marginTop: 16,
      width: '100%'
    },

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  },
  mdTop: {
    width: 'fit-content',

    [theme.breakpoints.down('lg')]: {
      width: '100%',
      justifyContent: 'space-between'
    }
  },
  iconsAndNames: {
    width: 'fit-content'
  },
  label: {
    marginRight: 2
  },
  tooltip: {
    color: colors.invariant.textGrey,
    ...typography.caption4,
    lineHeight: '24px',
    background: colors.black.full,
    borderRadius: 12,
    fontSize: 14
  }
}))
