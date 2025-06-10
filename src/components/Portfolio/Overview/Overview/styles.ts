import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  container: {
    width: '600px',
    backgroundColor: colors.invariant.component,
    borderTopLeftRadius: '24px',

    [theme.breakpoints.down('lg')]: {
      borderTopRightRadius: '24px',
      borderRight: `none`,
      maxHeight: 'fit-content',
      width: 'auto',
      padding: '0px 16px 0px 16px'
    },
    [theme.breakpoints.down('md')]: {
      borderRadius: 24
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 8px'
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
    [theme.breakpoints.down('lg')]: {
      marginTop: '16px'
    }
  },

  pieChartSection: {
    flex: '1 1 100%',
    minHeight: 'fit-content',
    [theme.breakpoints.down('lg')]: {
      marginTop: '100px'
    }
  },
  legendSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('lg')]: {
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
