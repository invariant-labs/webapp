import { Theme } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
export const usePositionTableRowStyle = makeStyles()((theme: Theme) => ({
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
  itemCellContainer: {
    width: 100,
    [theme.breakpoints.down(1029)]: {
      marginRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      width: 144,
      paddingInline: 6
    }
  },
  pointsCell: {
    width: '8%',
    '& > div': {
      justifyContent: 'center'
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
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },

  icons: {
    marginRight: 12,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
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
    cursor: 'pointer',
    transition: 'filter 0.2s',
    '&:hover': {
      filter: 'brightness(2)'
    }
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
    borderRadius: '12px',
    color: colors.invariant.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(180deg, #3FF2AB 0%, #25B487 100%)',
      boxShadow: '0 4px 15px rgba(46, 224, 154, 0.35)'
    }
  },

  blur: {
    width: 120,
    height: 30,
    borderRadius: 16,
    background: `linear-gradient(90deg, ${colors.invariant.component} 25%, ${colors.invariant.light} 50%, ${colors.invariant.component} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite'
  },

  valueWrapper: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 144,
    display: 'flex',
    justifyContent: 'center'
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

    transition: 'filter 0.2s linear',

    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  }
}))
