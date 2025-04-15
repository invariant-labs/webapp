import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    container: {
      minHeight: 48,
      background: 'rgba(239, 208, 99, 0.2)',
      border: `2px solid ${colors.invariant.yellow}`,
      borderRadius: 24,
      color: colors.invariant.yellow,
      paddingInline: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'height 300ms',
      [theme.breakpoints.down('sm')]: {
        paddingInline: 8
      }
    },
    closeIcon: {
      cursor: 'pointer',
      minWidth: 14
    }
  }
})

export default useStyles
