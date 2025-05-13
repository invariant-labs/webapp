import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tooltip: {
    background: colors.invariant.componentBcg,
    padding: '8px 12px',
    borderRadius: 4,

    '& p': {
      color: colors.invariant.text,
      ...typography.caption2
    }
  },
  sliceShadow: {
    '& path': {
      filter: 'drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.1))'
    }
  }
}))
