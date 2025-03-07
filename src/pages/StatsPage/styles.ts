import { theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    minHeight: '60vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingInline: 94,
    maxWidth: '100%',

    [theme.breakpoints.down('lg')]: {
      paddingInline: 36
    },

    [theme.breakpoints.down('md')]: {
      paddingInline: 40
    },

    [theme.breakpoints.down('sm')]: {
      paddingInline: 8
    }
  }
}))
