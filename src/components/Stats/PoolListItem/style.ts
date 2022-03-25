import { makeStyles } from '@material-ui/core'
import { colors, theme, typography } from '@static/theme'

const useStyle = makeStyles(() => ({
  container: {
    color: colors.invariant.textGrey,
    display: 'grid',
    gridTemplateColumns: '5% 55% 10% 17% 15% 15% 20%',
    padding: '18px 0',

    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,
    whiteSpace: 'nowrap',
    '& p': {
      ...typography.heading4,
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center'
    },

    [theme.breakpoints.down('sm')]: {
      '& p': {
        ...typography.caption2
      }
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '7% 28% 17% 28% 20%'
    }
  },

  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 28,
      marginRight: 3,
      borderRadius: '50%'
    }
  },

  iconsWrapper: {
    height: 28
  },

  header: {
    '& p': {
      ...typography.heading4,
      fontWeight: 400,

      [theme.breakpoints.down('sm')]: {
        ...typography.caption2
      }
    }
  },

  symbolsContainer: {
    marginLeft: 10,
    paddingRight: 5,

    '& p': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'block'
    }
  }
}))

export default useStyle
