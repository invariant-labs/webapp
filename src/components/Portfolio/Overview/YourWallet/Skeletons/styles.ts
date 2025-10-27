import { makeStyles } from 'tss-react/mui'
import { colors, theme } from '@static/theme'
export const useStyles = makeStyles()(() => ({
  tableCell: {
    display: 'flex',
    borderBottom: `1px solid ${colors.invariant.light}`,
    textAlign: 'center',
    paddingLeft: 8,
    alignItems: 'center',
    height: 57,
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: '100%'
  },
  tokenContainer: {
    paddingLeft: 8,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    [theme.breakpoints.down('md')]: {
      gap: '16px',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  desktopActionCell: {
    padding: '17px',

    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  valueSkeleton: {
    borderRadius: '6px',
    [theme.breakpoints.down('lg')]: {
      width: '98%'
    },
    width: '114%'
  },
  mobileCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  mobileCard: {
    backgroundColor: colors.invariant.component,
    borderRadius: '16px',
    height: '77px',
    padding: '16px',

    [theme.breakpoints.down('sm')]: {
      padding: '16px 8px'
    }
  },
  mobileActionsContainer: {
    display: 'flex',
    gap: '8px'
  },
  mobileStatsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px'
  }
}))
