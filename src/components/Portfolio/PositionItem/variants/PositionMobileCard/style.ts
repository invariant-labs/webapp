import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useMobileStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: 16,
    marginTop: '16px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      padding: '12px 8px '
    },
    background: colors.invariant.component,
    borderRadius: 24,
    '&:not(:last-child)': {
      marginBottom: 20
    },
    '&:hover': {
      background: `${colors.invariant.component}B0`
    }
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '8px',
    alignItems: 'center'
  },
  minMax: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    paddingInline: 10,
    width: '100%',
    marginRight: 0,
    marginTop: '8px'
  },
  button: {
    minWidth: '36px',
    width: '36px',
    height: '36px',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
    borderRadius: '16px',
    color: colors.invariant.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(180deg, #3FF2AB 0%, #25B487 100%)',
      boxShadow: '0 4px 15px rgba(46, 224, 154, 0.35)'
    }
  },

  mdInfo: {
    flexWrap: 'wrap',
    width: '100%'
  },
  mdTop: {
    justifyContent: 'space-between',
    width: '100%'
  },
  iconsAndNames: {
    display: 'flex'
  },
  icons: {
    alignItems: 'center',
    flexWrap: 'nowrap',
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
    textAlign: 'left',
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
    marginRight: 8,
    lineHeight: 20,
    paddingInline: 10,
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 0%'
    }
  },

  fee: {
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    // [theme.breakpoints.up(1361)]: {
    //   marginRight: 8
    // },
    // [theme.breakpoints.down(1361)]: {
    //   width: 'auto'
    // },

    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },
  actionButtonContainer: {
    marginLeft: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unclaimedFeeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    justifyContent: 'center'
  },
  activeFee: {
    background: colors.invariant.greenLinearGradient
  },
  infoCenter: {
    justifyContent: 'center',
    flex: '1 1 0%'
  },
  dropdown: {
    background: colors.invariant.greenLinearGradient,
    borderRadius: 11,
    height: 36,
    paddingInline: 10,
    marginRight: 8
  },
  dropdownLocked: {
    background: colors.invariant.lightHover
  },
  dropdownText: {
    color: colors.invariant.black,
    width: '100%'
  },
  value: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    paddingInline: 12,
    marginRight: 8
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
