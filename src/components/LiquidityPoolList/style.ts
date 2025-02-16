import { alpha } from '@mui/material'
import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 1072,
    borderRadius: '24px'
  },
  pagination: {
    borderTop: `1px solid ${colors.invariant.light}`,
    height: 90,
    padding: '20px 24px 10px 0',
    maxWidth: '100%',
    backgroundColor: colors.invariant.component,
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    [theme.breakpoints.down('lg')]: {
      padding: '20px 12px'
    }
  },
  noPoolFoundPlaceholder: {
    ...typography.body2,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightHover
  },
  addPoolButton: {
    height: 40,
    width: 200,
    margin: 20,
    color: colors.invariant.componentBcg,
    ...typography.body1,
    textTransform: 'none',
    borderRadius: 14,
    background: colors.invariant.pinkLinearGradientOpacity,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)',
      '@media (hover: none)': {
        background: colors.invariant.pinkLinearGradientOpacity,
        boxShadow: 'none'
      }
    }
  },
  noPoolFoundContainer: {
    height: 690,
    background: colors.invariant.component,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    borderBottom: `1px solid ${colors.invariant.light}`
  },
  img: {
    paddingBottom: 25
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
    height: 69,
    background: colors.invariant.component
  },
  emptyRowBorder: {
    height: 68,
    borderBottom: `1px solid ${colors.invariant.light}`
  }
}))
