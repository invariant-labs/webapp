import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles<{ isLoading: boolean }>()((_theme: Theme, { isLoading }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unclaimedSection: {
    display: 'flex',

    flexDirection: 'column',
    gap: '16px',
    minHeight: '32px',
    [theme.breakpoints.down('lg')]: {
      maxHeight: '76px'
    },

    [theme.breakpoints.up('lg')]: {
      height: '57.5px',
      padding: '0px 24px 0px 24px',
      borderTop: `1px solid  ${colors.invariant.light}`,
      borderBottom: `1px solid  ${colors.invariant.light}`,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },

  titleRow: {
    height: 28,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'space-between',

    [theme.breakpoints.up('lg')]: {
      gap: 'auto',
      flex: 1
    }
  },

  unclaimedTitle: {
    ...typography.heading4,
    color: colors.invariant.textGrey
  },

  unclaimedAmount: {
    ...typography.heading3,
    color: colors.invariant.text
  },
  claimAllButton: {
    ...typography.body1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px',
    height: '32px',
    marginLeft: '36px',
    background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
    borderRadius: '12px',
    textTransform: 'none',
    color: colors.invariant.dark,
    transition: 'all 0.3s ease',

    '&:hover': {
      background: 'linear-gradient(180deg, #3FF2AB 0%, #25B487 100%)',
      boxShadow: isLoading ? 'none' : '0 4px 15px rgba(46, 224, 154, 0.35)'
    },

    '&:active': {
      boxShadow: isLoading ? 'none' : '0 2px 8px rgba(46, 224, 154, 0.35)'
    },

    [theme.breakpoints.down('lg')]: {
      width: '100%',
      marginLeft: 0
    },

    '&:disabled': {
      background: colors.invariant.light,
      color: colors.invariant.dark
    }
  }
}))
