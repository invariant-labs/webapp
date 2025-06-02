import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
export const useStyles = makeStyles()((theme: Theme) => ({
  cellBase: {
    padding: '20px',
    paddingTop: '4px !important',
    paddingBottom: '4px !important',
    background: 'inherit',
    border: 'none',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },

  pairNameCell: {
    width: '25%',
    textAlign: 'left',
    padding: '14px 41px 14px 22px !important'
  },
  airdropIcon: {
    flexShrink: '0',
    height: '32px',
    width: '32px',
    opacity: 0.3,
    filter: 'grayscale(1)'
  },
  itemCellContainer: {
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.down(1029)]: {
      marginRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      width: 144,
      paddingInline: 6
    }
  },

  feeTierCell: {
    width: '10%',
    padding: '0 !important',
    '& > .MuiBox-root': {
      justifyContent: 'center',
      gap: '8px'
    }
  },

  tokenRatioCell: {
    paddingLeft: '15px',

    width: '18%',
    '& > .MuiTypography-root': {
      margin: '0 auto',
      maxWidth: '90%'
    }
  },

  valueCell: {
    paddingLeft: 0,
    width: '10%',
    '& .MuiGrid-root': {
      margin: '0 auto',
      justifyContent: 'center'
    }
  },

  feeCell: {
    paddingLeft: 0,

    width: '10%',
    '& .MuiGrid-root': {
      margin: '0 auto',
      justifyContent: 'center'
    }
  },

  chartCell: {
    width: '16%'
  },

  actionCell: {
    width: '8%',
    padding: '14px 8px',
    '& > .MuiButton-root': {
      margin: '0 auto'
    }
  },

  iconsAndNames: {
    flexWrap: 'nowrap',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },

  tokenIcon: {
    width: 40,
    borderRadius: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 28
    }
  },

  arrowsShared: {
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

  actionButton: {
    background: 'none',
    padding: 0,
    margin: 0,
    border: 'none',
    display: 'inline-flex',
    position: 'relative',
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

  iconsShared: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginRight: 12,
    width: 'fit-content',
    [theme.breakpoints.down('lg')]: {
      marginRight: 12
    }
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

  fee: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },

  activeFee: {
    background: colors.invariant.greenLinearGradient
  },
  infoCenter: {
    flex: '1 1 0%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  value: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    paddingInline: 12,
    marginRight: 8
  }
}))
