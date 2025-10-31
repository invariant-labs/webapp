import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  headerSkeleton: {
    background: colors.invariant.light,
    ...typography.heading1,
    [theme.breakpoints.down(850)]: {
      marginTop: '16px'
    }
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up(850)]: {
      padding: '16px 24px'
    },
    padding: '16px 0px',

    justifyContent: 'space-between'
  },
  headerText: {
    ...typography.heading3,
    color: colors.invariant.text,

    [theme.breakpoints.down(850)]: {
      ...typography.heading4
    }
  },
  warning: {
    marginRight: '8px'
  }
}))
