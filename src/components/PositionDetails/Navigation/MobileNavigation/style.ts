import { Theme } from '@emotion/react'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ disabled?: boolean }>()(
  (_theme: Theme, { disabled = false }) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      background: disabled ? colors.invariant.componentDark : colors.invariant.light,
      padding: 4,
      borderRadius: 8,
      flex: 1,
      transition: 'background 0.3s',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    iconContainer: { display: 'flex', alignItems: 'center', gap: 3 },
    icon: {
      height: 20,
      width: 20,
      borderRadius: '100%'
    }
  })
)
