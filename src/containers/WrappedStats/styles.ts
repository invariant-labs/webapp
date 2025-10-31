import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    maxWidth: 1210,
    minHeight: '100%',
    flexDirection: 'column'
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  }
}))

export default useStyles
