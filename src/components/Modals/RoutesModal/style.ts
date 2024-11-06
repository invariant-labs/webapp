import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.invariant.component,
      width: 160,
      borderRadius: 20,
      marginTop: 24,
      padding: '8px 12px'
    },
    listItem: {
      paddingTop: 2,
      color: colors.invariant.textGrey,
      padding: 8,
      background: colors.invariant.component,
      borderRadius: 11,
      width: '100%',
      paddingBlock: 8,
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginBottom: 8
      }
    },
    name: {
      textTransform: 'capitalize',
      color: colors.invariant.textGrey,
      ...typography.body3
    },
    current: {
      background: colors.invariant.light,
      color: colors.white.main,

      '& a p': {
        color: colors.white.main,
        visibility: 'visible'
      },
      '& *': {
        visibility: 'visible'
      }
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    link: {
      textDecoration: 'none'
    },
    subtitle: {
      ...typography.caption2,
      color: colors.invariant.textGrey,
      opacity: 0.4,
      background: colors.invariant.component,
      borderRadius: 11,
      padding: 4
    }
  }
})

export default useStyles
