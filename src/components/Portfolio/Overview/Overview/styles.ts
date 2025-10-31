import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  container: {
    boxSizing: 'border-box',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderTopLeftRadius: '24px',

    [theme.breakpoints.down(850)]: {
      borderRadius: 24,
      maxWidth: '960px',
      padding: '0 16px 0 16px',
      borderRight: `0px solid  ${colors.invariant.light}`,
      height: 345
    },
    borderRight: `1px solid  ${colors.invariant.light}`,
    display: 'flex',
    flexDirection: 'column'
  },
  tooltip: {
    color: colors.invariant.text,
    width: '150px',
    background: colors.invariant.componentDark,
    borderRadius: 12
  },
  subtitle: {
    ...typography.body2,
    color: colors.invariant.textGrey,
    [theme.breakpoints.down(850)]: {
      marginTop: '16px'
    }
  },

  pieChartSection: {
    flex: '1 0 100%',
    maxWidth: 222,
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    minHeight: 'fit-content',
    [theme.breakpoints.down(850)]: {
      marginTop: '100px'
    }
  },
  legendSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down(850)]: {
      justifyContent: 'center',
      flexDirection: 'column'
    }
  },

  segmentBox: {
    height: '100%',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    justifyContent: 'center',
    padding: '32px',
    gap: '16px',
    backgroundColor: colors.invariant.component,
    marginBottom: 8,
    [theme.breakpoints.up(850)]: {
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
