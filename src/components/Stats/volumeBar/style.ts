import { alpha } from '@mui/material'
import { colors, typography, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
export const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 1072,
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: 22,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      padding: '12px 12px',
      gap: 8,
      flexDirection: 'column'
    }
  },

  tokenName: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 'auto',
    flex: '1 1 auto',
    gap: 4,

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',

      '& p': {
        ...typography.body2,
        whiteSpace: 'nowrap'
      }
    },

    [theme.breakpoints.down('xs')]: {
      '& p': {
        whiteSpace: 'nowrap'
      },
      flex: '0 0 auto',
      width: '100%',
      justifyContent: 'center'
    },

    '&:nth-of-type(3)': {
      [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'center'
      },
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between'
      },
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end'
      }
    },

    '&:nth-of-type(2)': {
      justifyContent: 'center',
      textAlign: 'center'
    },
    '&:nth-of-type(1), &:nth-of-type(2)': {
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        textAlign: 'center'
      },

      ' &:nth-of-type(3), &:nth-of-type(1), &:nth-of-type(2)': {
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'space-between'
        }
      }
    }
  },

  tokenHeader: {
    ...typography.heading4,
    color: colors.invariant.textGrey,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flex: 1,
      alignItems: 'center'
    }
  },

  tokenContent: {
    ...typography.heading4,
    color: colors.white.main,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      '&:nth-of-type(3)': {
        justifyContent: 'flex-end',
        textAlign: 'center'
      }
    }
  },

  tokenLow: {
    color: colors.invariant.Error,
    fontWeight: 400
  },
  tokenUp: {
    color: colors.invariant.green,
    fontWeight: 400
  },
  loadingOverlay: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: alpha(colors.invariant.newDark, 0.7),
      backdropFilter: 'blur(4px)',
      zIndex: 1,
      pointerEvents: 'none',
      borderRadius: '24px'
    }
  }
}))
