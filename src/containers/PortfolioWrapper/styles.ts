import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    emptyContainer: {
      marginTop: 104,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      },
      width: 1210,
      display: 'flex',

      maxWidth: '100%'
    }
  }
})

export default useStyles
