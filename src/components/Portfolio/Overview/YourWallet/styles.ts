import { makeStyles } from 'tss-react/mui'
import { colors, typography, theme } from '@static/theme'
import { Theme } from '@mui/material'
export const useStyles = makeStyles<{ isLoading?: boolean; isScrollHide?: boolean }>()(
  (_theme: Theme, { isLoading, isScrollHide }) => ({
    container: {
      minWidth: '50%',
      overflowX: 'hidden'
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: colors.invariant.light,
      margin: '24px 0'
    },
    clipboardIcon: {
      marginLeft: 4,
      width: 18,
      cursor: 'pointer',
      color: colors.invariant.lightHover,
      '&:hover': {
        color: colors.invariant.text,

        '@media (hover: none)': {
          color: colors.invariant.lightHover
        }
      }
    },
    header: {
      background: colors.invariant.component,
      display: 'flex',
      padding: 16,
      [theme.breakpoints.down('lg')]: {
        borderTopLeftRadius: '24px'
      },
      borderTopLeftRadius: 0,
      borderTopRightRadius: '24px',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.invariant.light}`
    },
    headerText: {
      ...typography.heading2,
      paddingInline: '16px',
      color: colors.invariant.text
    },
    tableContainer: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: colors.invariant.component,
      height: '287px',
      overflowY: 'scroll',
      overflowX: 'hidden',

      '&::-webkit-scrollbar': {
        width: '4px',
        marginTop: '58.4px'
      },
      '&::-webkit-scrollbar-track': {
        background: colors.invariant.componentDark,

        marginTop: '58.4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: isLoading || isScrollHide ? 'transparent' : colors.invariant.pink,
        borderRadius: '4px'
      }
    },
    tableCell: {
      borderBottom: `1px solid ${colors.invariant.light}`,
      padding: '12px !important',
      textAlign: 'center'
    },
    headerCell: {
      fontSize: '20px',

      textWrap: 'nowrap',
      fontWeight: 600,
      color: colors.invariant.textGrey,
      borderBottom: `1px solid ${colors.invariant.light}`,
      backgroundColor: colors.invariant.component,
      position: 'sticky',
      top: 0,
      zIndex: 1
    },
    tokenContainer: {
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
    tokenIcon: {
      minWidth: 28,
      maxWidth: 28,
      height: 28,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    tokenSymbol: {
      ...typography.heading4,
      color: colors.invariant.text
    },
    mobileCardContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '345px',
      overflow: 'auto',
      paddingRight: '4px',
      gap: '9px',

      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        background: colors.invariant.componentDark,
        marginLeft: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: colors.invariant.pink,
        borderRadius: '4px'
      }
    },
    valueSkeleton: {
      borderRadius: '6px',
      [theme.breakpoints.down('lg')]: {
        width: '98%'
      },
      width: '114%'
    },
    statsContainer: {
      backgroundColor: colors.invariant.light,
      display: 'inline-flex',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('lg')]: {
        padding: '4px 6px'
      },
      padding: '4px 12px',
      maxHeight: '24px',
      borderRadius: '6px',
      gap: '8px'
    },
    statsLabel: {
      ...typography.caption1,
      color: colors.invariant.textGrey
    },
    statsValue: {
      ...typography.body1,
      color: colors.invariant.green
    },
    actionIcon: {
      height: 32,
      background: 'none',
      width: 32,
      padding: 0,
      margin: 0,
      border: 'none',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: colors.invariant.black,
      textTransform: 'none',
      transition: 'filter 0.3s linear',
      '&:hover': {
        filter: 'brightness(1.2)',
        cursor: 'pointer',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    zebraRow: {
      '& > tr:nth-of-type(odd)': {
        background: `${colors.invariant.componentDark}`
      }
    },

    mobileActionContainer: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.invariant.light}`
      }
    },
    desktopActionCell: {
      padding: '17px',

      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    mobileActions: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        gap: '8px'
      }
    },
    mobileContainer: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        gap: '9px'
      }
    },
    mobileCard: {
      backgroundColor: colors.invariant.component,
      flexShrink: 0,
      borderRadius: '16px',
      height: '77px',
      padding: '16px',

      [theme.breakpoints.down('sm')]: {
        padding: '16px 8px'
      }
    },
    mobileCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    mobileTokenInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    mobileActionsContainer: {
      display: 'flex',
      gap: '8px'
    },
    mobileStatsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '8px'
    },
    mobileStatItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: colors.invariant.light,
      borderRadius: '10px',
      textAlign: 'center',
      width: '100%',
      minHeight: '24px'
    },
    mobileStatLabel: {
      ...typography.caption1,
      color: colors.invariant.textGrey
    },
    mobileStatValue: {
      ...typography.caption1,
      color: colors.invariant.green
    },
    desktopContainer: {
      width: '600px',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      },
      [theme.breakpoints.down('lg')]: {
        width: 'auto'
      }
    },
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
      }
    },
    emptyStateText: {
      ...typography.heading2,
      color: colors.invariant.text,
      textAlign: 'center'
    },
    warningIcon: {
      position: 'absolute',
      width: 12,
      height: 12,
      bottom: -4,
      right: '67%',
      [theme.breakpoints.down('lg')]: {
        right: '53%'
      }
    }
  })
)
