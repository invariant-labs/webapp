import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ noData: boolean }>()((theme, { noData }) => ({
  upperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 71,
    flexDirection: 'row',
    rowGap: 12,

    [theme.breakpoints.down(1200)]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(1200)]: {
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
      justifyContent: noData ? 'flex-end' : 'space-between',
      width: '100%',
      height: 'auto'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(1200)]: {
      height: 40
    }
  },
  addressIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  iconContainer: { display: 'flex', alignItems: 'center', gap: 3 },
  icon: {
    borderRadius: '100%',
    height: 36,
    width: 36,
    [theme.breakpoints.down(1040)]: {
      height: 28,
      width: 28
    }
  },
  reverseTokensIcon: {
    color: colors.invariant.lightGrey
  },
  tickerContainer: {
    color: colors.white.main,
    ...typography.heading3,
    [theme.breakpoints.down(1040)]: {
      ...typography.heading4
    }
  },
  actionButton: {
    background: 'none',
    padding: 0,
    margin: 0,
    border: 'none',
    color: colors.invariant.black,
    textTransform: 'none',
    transition: 'filter 0.3s linear',
    height: 'min-content',

    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  selectContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  customSelect: {
    justifyContent: 'flex-start',
    border: 'none',
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 13,
    paddingInline: 13,
    height: 44,
    flex: 1,
    minWidth: 130,
    '& .selectArrow': {
      marginLeft: 'auto'
    },

    '&:hover': {
      backgroundColor: colors.invariant.light,
      '@media (hover: none)': {
        backgroundColor: colors.invariant.componentBcg
      }
    }
  }
}))

export default useStyles
