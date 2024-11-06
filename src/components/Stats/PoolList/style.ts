import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 1072,
    padding: '0 24px',
    borderRadius: '24px',
    backgroundColor: `${colors.invariant.component} !important`
  },
  pagination: {
    padding: '20px 0 10px 0',
    maxWidth: '100%'
  }
}))
