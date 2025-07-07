import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    gap: '16px',
    height: 112,
    backgroundColor: colors.invariant.component,
    marginBottom: 29,
    [theme.breakpoints.up('lg')]: {
      background:
        'linear-gradient(360deg, rgba(32, 41, 70, 0.8) 0%, rgba(17, 25, 49, 0.8) 100%), linear-gradient(180deg, #010514 0%, rgba(1, 5, 20, 0) 100%)'
    }
  },
  emptyStateText: {
    ...typography.heading2,
    color: colors.invariant.text,
    textAlign: 'center'
  }
}))
