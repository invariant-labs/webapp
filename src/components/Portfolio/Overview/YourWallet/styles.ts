import { makeStyles } from 'tss-react/mui'
import { colors, typography, theme } from '@static/theme'
import { Theme } from '@mui/material'
export const useStyles = makeStyles<{ isLoading?: boolean; isScrollHide?: boolean }>()(
  (_theme: Theme, { isLoading, isScrollHide }) => ({
    container: {
      maxWidth: 600,
      boxSizing: 'border-box',
      width: '100%',
      [theme.breakpoints.down(850)]: {
        maxWidth: '100%'
      }
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
      boxSizing: 'border-box',
      background: colors.invariant.component,
      display: 'flex',
      padding: 16,
      height: 61,
      [theme.breakpoints.down(850)]: {
        borderTopLeftRadius: '24px'
      },
      borderTopLeftRadius: 0,
      borderTopRightRadius: '24px',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.invariant.light}`
    },
    headerText: {
      ...typography.heading3,

      color: colors.invariant.text
    },
    tableContainer: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: colors.invariant.component,
      height: '228px',
      overflowY: 'scroll',

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

    headerCell: {
      flexGrow: 1,
      textAlign: 'center',
      ...typography.heading4,
      fontSize: 18,
      padding: '17px 0',
      textWrap: 'nowrap',
      color: colors.invariant.textGrey,
      borderBottom: `1px solid ${colors.invariant.light}`,
      backgroundColor: colors.invariant.component,
      position: 'sticky',
      top: 0,
      zIndex: 1
    },
    headerCellTokenName: {
      display: 'flex',
      boxSizing: 'border-box',
      textAlign: 'left',
      ...typography.heading4,
      fontSize: 18,
      padding: '17px 0',
      paddingLeft: '16px !important',
      textWrap: 'nowrap',
      color: colors.invariant.textGrey,
      borderBottom: `1px solid ${colors.invariant.light}`,
      backgroundColor: colors.invariant.component
    },
    tokenContainer: {
      display: 'flex',
      boxSizing: 'border-box',
      padding: '12px 0 12px 12px',
      alignItems: 'center',
      gap: '8px',
      [theme.breakpoints.down(850)]: {
        gap: '16px',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    tokenInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      [theme.breakpoints.down('md')]: {
        gap: 0
      }
    },
    tokenIcon: {
      minWidth: 26,
      maxWidth: 26,
      height: 26,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    tokenSymbol: {
      ...typography.heading4,
      fontSize: 18,
      color: colors.invariant.text,
      [theme.breakpoints.down('md')]: {
        display: 'none'
      },
      [theme.breakpoints.down(850)]: {
        display: 'flex'
      }
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
      [theme.breakpoints.down(850)]: {
        width: '98%'
      },
      width: '114%'
    },
    statsContainer: {
      backgroundColor: colors.invariant.light,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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

    mobileActionContainer: {
      display: 'none',
      [theme.breakpoints.down(850)]: {
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.invariant.light}`
      }
    },
    desktopActionCell: {
      padding: '17px',

      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    mobileActions: {
      display: 'none',
      [theme.breakpoints.down(850)]: {
        display: 'flex',
        gap: '8px'
      }
    },
    mobileContainer: {
      display: 'none',
      [theme.breakpoints.down(850)]: {
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
      maxWidth: '600px',
      width: '100%',
      [theme.breakpoints.down(850)]: {
        display: 'none'
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
      right: -4
    },

    zebraRow: {
      display: 'grid',
      background: 'white',

      gridTemplateColumns: 'auto 1fr 1fr 110px',

      '& > *': {
        display: 'contents'
      },
      '& > *:nth-of-type(odd) > *': {
        backgroundColor: colors.invariant.componentDark
      },
      '& > *:nth-of-type(even) > *': {
        backgroundColor: `${colors.invariant.component}`
      },
      '& > * > *': {
        borderBottom: `1px solid ${colors.invariant.light}`
      }
    }
  })
)
