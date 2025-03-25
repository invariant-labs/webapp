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
      width: 150,
      height: 150,
      margin: 'auto'
    },
    fullHeightContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      marginTop: 104,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      },
      width: 1122,
      display: 'flex',
      maxWidth: '100%'
    },
    emptyContainer: {
      marginTop: 104,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      },
      width: 1122,
      display: 'flex',
      maxWidth: '100%'
    },
    emptyContainer2: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      marginTop: 104,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      },
      width: 1122,
      maxWidth: '100%'
    }
  }
})

export default useStyles
