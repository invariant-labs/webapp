import { makeStyles } from 'tss-react/mui'
import { typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles<{ color: string }>()((_theme: Theme, { color }) => ({
  segmentTokenLabel: {
    color,
    ...typography.body2,
    fontWeight: '600',
    marginBottom: 0.5
  },
  segmentTokenValue: {
    marginBottom: 0.5,
    ...typography.body2
  }
}))
