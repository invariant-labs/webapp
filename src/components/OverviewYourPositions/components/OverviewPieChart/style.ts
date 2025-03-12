import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ chartColors: string[]; hoveredColor: string | null }>()(
  (_theme, { chartColors, hoveredColor }) => ({
    pieChartContainer: {
      width: '100%',
      height: '100%',
      maxHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dark_background: {
      backgroundColor: `${colors.invariant.componentDark} !important`,
      borderRadius: '8px !important',
      display: 'flex !important',
      flexDirection: 'column',
      padding: '8px !important',
      minWidth: '150px !important',
      boxShadow: '27px 39px 75px -30px #000'
    },
    dark_paper: {
      backgroundColor: `${colors.invariant.componentDark} !important`,
      color: '#FFFFFF !important',
      boxShadow: 'none !important'
    },
    value_cell: {
      color: '#fff !important'
    },
    label_cell: {
      color: `${hoveredColor || chartColors?.[0]} !important`,
      fontWeight: 'bold'
    },
    dark_table: {
      color: '#FFFFFF !important',
      display: 'flex !important',
      flexDirection: 'column',
      gap: '4px'
    },
    dark_cell: {
      padding: '2px 0 !important'
    },
    dark_mark: {
      display: 'none !important'
    },
    dark_row: {
      color: '#FFFFFF !important',
      display: 'flex !important',
      flexDirection: 'column'
    }
  })
)
