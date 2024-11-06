import { colors, typography, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  general: {
    width: 26,
    maxWidth: 26,
    height: 14,
    ...typography.tiny2,
    background: 'rgba(46, 224, 154, 0.8)',
    borderRadius: 4,
    marginLeft: 4,
    marginTop: 1,
    textTransform: 'none',
    '&:hover': {
      background: `${colors.invariant.green} !important`,
      '@media (hover: none)': {
        background: 'rgba(46, 224, 154, 0.8)'
      }
    },

    [theme.breakpoints.down('md')]: {
      ...typography.tiny2,
      width: 26,
      maxWidth: 26,
      height: 14,
      marginTop: 1
    }
  },

  activeButton: {
    background: `${colors.invariant.green} !important`
  },

  disabled: {
    ...typography.tiny2,
    width: 20,
    maxWidth: 26,
    height: 15,
    color: `${colors.invariant.dark} !important`,
    background: `${colors.invariant.light} !important`,
    '&:hover': {
      background: colors.invariant.light,
      cursor: 'default'
    }
  }
}))

export default useStyles
