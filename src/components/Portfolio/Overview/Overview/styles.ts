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
    transition: 'all 0.2s'
  }
}))
