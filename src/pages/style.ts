import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    flex: 1
  }
}))

export default useStyles
