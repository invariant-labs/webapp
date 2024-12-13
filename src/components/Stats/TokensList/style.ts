import { alpha } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 1072,
    padding: '0 24px',
    borderRadius: '24px',
    backgroundColor: colors.invariant.component
  },
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBlock: 10
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
  }
}))

export default useStyles
