import { alpha } from '@mui/material'
import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(_theme => ({
  headerWrapper: {
    display: 'flex',
    flexShrink: 1,
    background: colors.invariant.component,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: '12px 16px',
    marginTop: 12,
    borderBottom: `1px solid ${colors.invariant.light}`,
    [theme.breakpoints.down('sm')]: {
      padding: '12px 8px'
    }
  },
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'nowrap'
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  },
  headerContainer: {
    display: 'flex',
    gap: 14,
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 8
    },

    [theme.breakpoints.down('sm')]: {
      flex: 1,
      justifyContent: 'flex-end'
    }
  },
  subheader: {
    ...typography.heading4,
    color: colors.white.main,
    display: 'flex'
  },
  container: {
    flexDirection: 'column',
    maxWidth: 1210,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    backgroundColor: colors.invariant.component,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  pagination: {
    maxWidth: '100%',
    backgroundColor: colors.invariant.component,
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px'
  },
  emptyContainer: {
    background: colors.invariant.component,
    borderBottom: `2px solid ${colors.invariant.light}`,
    boxSizing: 'border-box'
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
  },
  emptyRow: {
    height: 79,
    background: colors.invariant.component,
    boxSizing: 'border-box'
  },
  showFavouritesButton: {
    height: 40,
    background: colors.invariant.component,
    borderRadius: 9,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textTransform: 'none',
    width: 170,
    textAlign: 'right',
    padding: 0,
    border: `1px solid ${colors.invariant.light}`,
    '&:hover': {
      background: colors.invariant.component,
      boxShadow: 'none',
      filter: 'brightness(1.2)'
    },

    [theme.breakpoints.down('md')]: {
      minWidth: 40,
      width: 40
    }
  },
  showFavouritesText: {
    ...typography.body2,
    color: colors.invariant.textGrey,
    marginTop: 2,
    width: 108
  },
  sortWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexShrink: 1,

    [theme.breakpoints.down('sm')]: {
      margin: 0,
      flex: 'none'
    }
  }
}))
