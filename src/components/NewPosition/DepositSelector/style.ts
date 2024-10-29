import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      borderRadius: 10,
      backgroundColor: colors.invariant.component,
      padding: '16px 24px 16px 24px',
      flex: '1 1 0%',

      [theme.breakpoints.down('sm')]: {
        padding: '16px 8px  16px 8px '
      }
    },
    sectionTitle: {
      ...typography.heading4,
      marginBottom: 24,
      color: colors.white.main
    },
    sectionWrapper: {
      borderRadius: 8,
      backgroundColor: colors.invariant.component,
      paddingTop: 0,
      width: '100%'
    },
    inputLabel: {
      ...typography.body3,
      lineHeight: '16px',
      color: colors.invariant.light,
      marginBottom: 3
    },
    selects: {
      gap: 12,
      marginBottom: 10
    },
    selectWrapper: {
      flex: '1 1 0%'
    },
    customSelect: {
      width: '100%',
      justifyContent: 'flex-start',
      border: 'none',
      backgroundColor: colors.invariant.componentBcg,
      borderRadius: 13,
      paddingInline: 13,
      height: 44,

      '& .selectArrow': {
        marginLeft: 'auto'
      },

      '&:hover': {
        backgroundColor: colors.invariant.light,
        '@media (hover: none)': {
          backgroundColor: colors.invariant.componentBcg
        }
      }
    },
    addButton: {
      height: '48px',
      width: '100%',
      margin: '30px 0',
      cursor: 'default'
    },
    hoverButton: {
      '&:hover': {
        filter: 'brightness(1.2)',
        boxShadow: `0 0 10px ${colors.invariant.pink}`,
        transition: '.2s all',
        cursor: 'pointer'
      }
    },
    arrows: {
      width: 32,
      cursor: 'pointer',

      '&:hover': {
        filter: 'brightness(2)',
        '@media (hover: none)': {
          filter: 'none'
        }
      }
    },
    connectWalletButton: {
      height: '48px !important',
      borderRadius: '16px',
      width: '100%',
      margin: '30px 0',

      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  }
})
