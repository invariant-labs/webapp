import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '24px',
      '& p': {
        ...typography.heading3,
        color: colors.invariant.text
      },
      '& img': {
        width: 16,
        cursor: 'pointer'
      }
    },
    socialsContainer: {
      width: '100%',
      display: 'flex',
      gap: 4,
      flexDirection: 'column'
    },

    paper: {
      background: colors.invariant.component,
      borderRadius: '24px',
      boxShadow: 'none',
      maxWidth: '350px',
      padding: '24px'
    },

    social: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '10px 10px'
    },
    label: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: '11px',
      alignItems: 'center',
      width: '100%',
      '& p': {
        ...typography.body2,
        color: colors.invariant.textGrey,
        textAlign: 'left'
      }
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
    }
  }
})

export default useStyles
