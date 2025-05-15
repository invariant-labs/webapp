import { alpha } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(_theme => ({
  container: {
    flexDirection: 'column',
    maxWidth: 1072,
    flexWrap: 'nowrap',
    position: 'relative',
    overflow: 'hidden'
  },
  pagination: {
    padding: 0,
    maxWidth: '100%',
    backgroundColor: colors.invariant.component,
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px'
  },
  loadingOverlay: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: alpha(colors.invariant.newDark, 0.7),
      backdropFilter: 'blur(4px)',
      zIndex: 1,
      pointerEvents: 'none',
      borderRadius: '24px'
    }
  },

  emptyRow: {
    height: 69,
    background: colors.invariant.component,
    boxSizing: 'border-box'
  }
}))

export default useStyles
