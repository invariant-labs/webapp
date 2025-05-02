import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      width: 952,
      flexDirection: 'column',
      maxWidth: '100%'
    },
    headerContainer: {
      columnGap: 24,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    back: {
      alignItems: 'center',
      height: 24,
      marginBottom: 18,
      width: 'fit-content',
      transition: 'filter 300ms',

      '&:hover': {
        filter: 'brightness(2)',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    backIcon: {
      width: 22,
      height: 24,
      marginRight: 12
    },
    backText: {
      color: colors.invariant.lightHover,
      WebkitPaddingBefore: '2px',
      ...typography.body2
    },
    title: {
      color: colors.white.main,
      ...typography.heading4,

      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      }
    },
    row: {
      minWidth: 464,
      minHeight: 540,
      position: 'relative',
      flexDirection: 'row',

      '& .blurLayer': {
        height: '100%'
      },

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        minWidth: 0,

        '& .blurInfo': {
          justifyContent: 'flex-start',
          paddingTop: 60
        }
      }
    },
    deposit: {
      marginRight: 24,

      [theme.breakpoints.down('md')]: {
        marginBottom: 24,
        marginRight: 0
      }
    },
    settingsIconBtn: {
      width: 20,
      height: 20,
      padding: 0,
      margin: 0,
      marginLeft: 10,
      minWidth: 'auto',
      background: 'none',
      '&:hover': {
        backgroundColor: 'none'
      }
    },
    settingsIcon: {
      width: 20,
      height: 20,
      cursor: 'pointer',
      transition: 'filter 300ms',
      '&:hover': {
        filter: 'brightness(1.5)',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    options: {
      alignItems: 'center',
      width: 'calc(50% - 12px)',
      height: 28,
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',

      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    switch: {
      transition: 'opacity 300ms',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    titleContainer: {
      maxWidth: 464,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {
        maxWidth: 'none',
        marginBottom: 8
      }
    },
    optionsWrapper: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end'
    },
    link: {
      maxHeight: 14,
      height: 14,
      width: 14,
      '& img': {
        height: 14,
        width: 14
      },
      '&:hover': {
        filter: 'brightness(1.2)',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    refreshIconBtn: {
      padding: 0,
      margin: 0,
      minWidth: 'auto',
      background: 'none',
      marginRight: 7,
      '&:hover': {
        background: 'none'
      },
      '&:disabled': {
        opacity: 0.5
      }
    },
    refreshIcon: {
      width: 26,
      height: 21,
      cursor: 'pointer',
      transition: 'filter 300ms',
      '&:hover': {
        filter: 'brightness(1.5)'
      }
    }
  }
})

export default useStyles
