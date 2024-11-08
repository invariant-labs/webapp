import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.invariant.component,
      width: 220,
      borderRadius: 20,
      marginTop: 8,
      padding: 8
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    title: {
      ...typography.body1,
      margin: 10
    },
    subTitle: {
      ...typography.body2,
      margin: 10
    },
    button: {
      color: colors.invariant.lightGrey,
      borderRadius: 11,
      padding: '6px 7px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: colors.white.main,
        background: colors.invariant.light,
        '@media (hover: none)': {
          color: colors.invariant.lightGrey
        }
      },
      '&:first-of-type': {
        marginBottom: '4px'
      },
      '&:not(:first-of-type)': {
        margin: '4px 0'
      },
      '&:last-of-type': {}
    },
    buttonName: {
      textTransform: 'capitalize',
      ...typography.body1,
      float: 'left',
      paddingTop: '2px'
    }
  }
})

export default useStyles
