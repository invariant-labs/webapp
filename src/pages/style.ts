import { theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    flex: 1,
    marginTop: '65px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
      overflowX: 'hidden'
    }
  }
}))

export default useStyles
