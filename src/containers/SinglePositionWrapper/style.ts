import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    placeholderText: {
      ...typography.heading1,
      textAlign: 'center',
      color: colors.white.main
    },
    loading: {
      width: 300,
      height: 300,
      [theme.breakpoints.down('sm')]: {
        width: 150,
        height: 150
      },
      margin: 'auto'
    },
    fullHeightContainer: {
      height: '60vh',
      width: 1122,
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex'
    },
    emptyContainer: {
      marginTop: 104,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      },
      width: 1122,
      display: 'flex',
      maxWidth: '100%'
    }
  }
})

export default useStyles
