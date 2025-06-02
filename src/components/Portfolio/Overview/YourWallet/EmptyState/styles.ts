import { makeStyles } from 'tss-react/mui'
import { colors, typography, theme } from '@static/theme'
export const useStyles = makeStyles()(() => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',

    gap: '16px',
    border: 'none',
    background: colors.invariant.component,
    borderRadius: 24,
    [theme.breakpoints.up('lg')]: {
      background:
        'linear-gradient(360deg, rgba(32, 41, 70, 0.8) 0%, rgba(17, 25, 49, 0.8) 100%), linear-gradient(180deg, #010514 0%, rgba(1, 5, 20, 0) 100%)',
      borderRadius: 0
    },
    [theme.breakpoints.down('md')]: { height: 281 }
  },
  emptyStateText: {
    ...typography.heading2,
    color: colors.invariant.text,
    textAlign: 'center'
  }
}))
