import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  title: {
    ...typography.heading4,
    color: colors.white.main
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))
