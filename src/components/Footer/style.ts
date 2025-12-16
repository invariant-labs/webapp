import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    footer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '35px 0',
      position: 'relative',
      zIndex: 50,
      flexDirection: 'column',
      [theme.breakpoints.down(1200)]: {
        marginBottom: 48
      }
    },
    footerItem: {
      margin: '0 10px',
      opacity: '.5',

      [theme.breakpoints.down(1200)]: {
        opacity: '.25'
      },

      transition: '.3s all',
      '&:hover': {
        opacity: 1,
        transform: 'scale(1.1) rotate(10deg)',
        '@media (hover: none)': {
          opacity: '.25',
          transform: 'none'
        }
      }
    },
    footerLink: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      transition: '300ms'
    },
    tooltip: {
      color: colors.invariant.textGrey,
      ...typography.caption4,
      lineHeight: '24px',
      background: colors.black.full,
      borderRadius: 12,
      height: 24,
      width: 59,
      padding: 0,
      textAlign: 'center'
    },
    icon: {
      height: 40,
      width: 40
    },
    link: {
      color: colors.invariant.lightGrey,
      cursor: 'pointer',
      marginTop: 1,
      textDecoration: 'underline',
      ...typography.caption2,
      p: {
        ...typography.caption2
      }
    }
  }
})

export default useStyles
