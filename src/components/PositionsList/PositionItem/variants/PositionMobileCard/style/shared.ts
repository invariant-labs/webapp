import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useSharedStyles = makeStyles()((theme: Theme) => ({
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
  actionButton: {
    background: 'none',
    padding: 0,
    margin: 0,
    border: 'none',
    position: 'relative',
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
  button: {
    ...typography.body1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    maxWidth: '36px',
    maxHeight: '36px',
    background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
    borderRadius: '16px',
    textTransform: 'none',
    color: colors.invariant.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(180deg, #3FF2AB 0%, #25B487 100%)',
      boxShadow: '0 4px 15px rgba(46, 224, 154, 0.35)'
    },
    '&:active': {
      boxShadow: '0 2px 8px rgba(46, 224, 154, 0.35)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
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
