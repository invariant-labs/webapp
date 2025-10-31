import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.invariant.component,
      width: 200,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      padding: 16,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      gap: 10
    },
    paper: {
      background: 'transparent',
      borderRadius: '16px',
      boxSizing: 'border-box',
      marginTop: '8px',
      boxShadow: `0px 2px 8px ${colors.invariant.black}`
    },
    optionButton: {
      width: 40,
      height: 40,
      outline: 'none',
      border: `1px solid ${colors.invariant.light}`,
      borderRadius: 8,
      padding: 8,
      minWidth: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: colors.invariant.component,
      textDecoration: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: colors.invariant.newDark,
        cursor: 'pointer'
      },
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    selectButton: {
      width: '100%',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      background: colors.invariant.component,
      textDecoration: 'none',
      textTransform: 'none',
      transition: 'filter 0.3s',
      padding: 12,
      minWidth: 170,
      borderRadius: 9,
      border: `1px solid ${colors.invariant.light}`,
      '&:hover': {
        background: colors.invariant.component,
        boxShadow: 'none',
        filter: 'brightness(1.2)'
      },
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    active: {
      background: colors.invariant.componentBcg
    }
  }
})
