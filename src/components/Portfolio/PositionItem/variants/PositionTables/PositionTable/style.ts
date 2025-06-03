import { Theme } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const usePositionTableStyle = makeStyles<{ isScrollHide: boolean }>()(
  (_theme: Theme, { isScrollHide }) => ({
    tableContainer: {
      width: 'fit-content',
      background: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column'
    },
    table: {
      borderCollapse: 'separate',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    cellBase: {
      padding: '14px 20px',
      background: 'inherit',
      border: 'none',
      borderTop: `1px solid ${colors.invariant.light}`,

      whiteSpace: 'nowrap',
      textAlign: 'center'
    },
    headerRow: {
      height: '50px',
      background: colors.invariant.component,
      '& th:first-of-type': {
        borderTopLeftRadius: '24px'
      },
      '& th:last-child': {
        borderTopRightRadius: '24px'
      }
    },
    headerCell: {
      fontSize: '20px',
      lineHeight: '24px',
      borderBottom: `2px solid ${colors.invariant.light}`,

      color: colors.invariant.textGrey,
      fontWeight: 600,
      textAlign: 'left'
    },

    pairNameCell: {
      width: '25%',
      textAlign: 'left',
      padding: '14px 41px 14px 22px !important'
    },

    feeTierCell: {
      width: '8%',
      '& > div': {
        justifyContent: 'center'
      }
    },
    tokenRatioCell: {
      width: '18%',
      '& > div': {
        margin: '0 auto'
      }
    },
    valueCell: {
      width: '9%',
      '& .MuiGrid-root': {
        justifyContent: 'center'
      }
    },
    feeCell: {
      width: '10%',
      '& .MuiGrid-root': {
        justifyContent: 'center'
      }
    },
    chartCell: {
      width: '16%',
      '& > div': {
        margin: '0 auto'
      }
    },
    actionCell: {
      width: '8%',
      padding: '14px 8px',
      '& > button': {
        margin: '0 auto'
      }
    },
    tableHead: {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed'
    },
    tableBody: {
      display: 'block',
      height: 'calc(4 * (20px + 82px))',
      overflowY: 'auto',
      background: colors.invariant.component,
      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        background: colors.invariant.componentDark
      },
      '&::-webkit-scrollbar-thumb': {
        background: isScrollHide ? 'transparent' : colors.invariant.pink,
        borderRadius: '4px'
      },

      '& > tr:nth-of-type(even)': {
        background: colors.invariant.component,
        transition: 'filter 300ms ease-in-out',

        '&:hover': {
          filter: 'brightness(1.1)',
          cursor: 'pointer'
        }
      },
      '& > tr:nth-of-type(odd)': {
        background: `${colors.invariant.componentDark}F0`,
        transition: 'filter 300ms ease-in-out',
        '&:hover': {
          filter: 'brightness(1.1)',

          cursor: 'pointer'
        }
      },
      '& > tr': {
        background: 'transparent',
        '& td': {
          borderBottom: `1px solid ${colors.invariant.light}`
        }
      },
      '& > tr:first-of-type td': {
        borderTop: `none`
      },
      '& > tr:last-of-type td': {
        borderBottom: `none`
      }
    },
    tableBodyRow: {
      display: 'table',
      width: '100%',
      height: '82.6px',
      tableLayout: 'fixed'
    },
    tableFooter: {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
      borderTop: `1px solid ${colors.invariant.light}`
    },
    footerRow: {
      background: colors.invariant.component,
      height: '56.8px',
      '& td:first-of-type': {
        borderBottomLeftRadius: '24px'
      },
      '& td:last-child': {
        borderBottomRightRadius: '24px'
      }
    },

    emptyContainer: {
      border: 'none',
      padding: 0,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    emptyWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
      width: '100%'
    }
  })
)
