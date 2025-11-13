import { alpha } from '@mui/material'
import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  subheader: {
    ...typography.heading4,
    color: colors.white.main
  },
  plotsRow: {
    flexWrap: 'nowrap',
    marginBottom: 24,
    flexDirection: 'column',
    background: colors.invariant.component,
    borderRadius: 24,
    padding: 24,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '24px 8px'
    }
  },
  loadingOverlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
  plot: {
    width: 605,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },

  label: {
    ...typography.body3,
    color: colors.invariant.textGrey,

    [theme.breakpoints.down('md')]: {
      ...typography.body2
    }
  },
  volumeBar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  value: {
    ...typography.heading4,
    color: colors.invariant.text,

    [theme.breakpoints.down('md')]: {
      ...typography.body1
    }
  }
}))
