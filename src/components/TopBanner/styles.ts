import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    background: {
      opacity: 0.7,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      background: colors.invariant.black
    },
    container: {
      width: '100%',
      maxWidth: 512,
      position: 'fixed',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      left: '50%',
      zIndex: 1000
    },
    modal: {
      marginInline: 16,
      background: colors.invariant.component,
      padding: 24,
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      ...typography.body1,
      color: colors.invariant.text
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }
})

export default useStyles
