import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ isSmall: boolean; width: number | string }>()(
  (_theme: Theme, { isSmall, width }) => ({
    searchBar: {
      flexShrink: 1,
      minHeight: 38,
      borderRadius: 10,
      background: colors.invariant.black,
      border: '1px solid #202946',
      color: colors.invariant.light,
      width: isSmall ? '100%' : width,
      display: 'flex',
      alignItems: 'center'
    },
    searchIcon: {
      width: 17,
      paddingRight: '10px'
    },
    paper: {
      width: '100%',
      maxWidth: '100%',
      margin: isSmall ? '0 auto' : undefined,
      boxShadow: 'none',
      marginTop: 8,
      borderRadius: '10px',
      background: colors.invariant.component,
      border: `1px solid ${colors.invariant.dark}`
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 10,
      padding: 2
    },
    headerText: {
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    commonTokens: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    },
    divider: {
      background: colors.invariant.light,
      height: 1,
      width: '100%',
      marginBottom: 16
    },
    liqudityLabel: { ...typography.body2, color: colors.invariant.textGrey },
    tokenLabel: {
      ...typography.heading3
    },
    labelContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 4px 2px 4px'
    },
    addressLabel: {
      ...typography.caption4,
      color: colors.invariant.textGrey
    },
    feeTierLabel: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    },
    feeTierProcent: {
      ...typography.heading3,
      color: colors.invariant.text
    },
    feeTierText: {
      padding: '2px 4px 2px 4px',
      ...typography.caption4,
      color: colors.invariant.textGrey
    }
  })
)

export default useStyles
