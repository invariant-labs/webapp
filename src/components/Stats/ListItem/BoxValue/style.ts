import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    background: colors.invariant.light,
    height: 40,
    borderRadius: 6,
    transition: 'filter 0.3s ease-in-out',
    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',

      '@media (hover: none)': {
        filter: 'brightness(1)',
        cursor: 'default'
      }
    }
  },
  disabled: {
    filter: 'brightness(0.8)',
    cursor: 'not-allowed'
  },
  title: {
    color: colors.invariant.text,
    ...typography.body2,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    }
  }
}))
