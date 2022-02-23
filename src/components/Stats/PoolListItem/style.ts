import { makeStyles } from '@material-ui/core'
import { colors, theme, typography } from '@static/theme'

const useStyle = makeStyles(() => ({
  container: {
    color: colors.invariant.textGrey,
    display: 'grid',
    gridTemplateColumns: '5% 55% 10% 17% 15% 15%',
    padding: '18px 0',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,
    whiteSpace: 'nowrap',
    '& p': {
      ...typography.heading4
    },

    [theme.breakpoints.down(960)]: {
      gridTemplateColumns: '5% 35% 15% 21% 20% 20%',

      '& p': {
        ...typography.heading4
      }
    },

    [theme.breakpoints.down(450)]: {
      gridTemplateColumns: ' 10% 27% 15% 26% 20%'
    },

    [theme.breakpoints.down(600)]: {
      '& p': {
        ...typography.caption2
      }
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

  header: {
    header: {
      '& p': {
        ...typography.heading4,
        fontWeight: 400
      }
    }
  },

  symbolsContainer: { marginLeft: 10 }
}))

export default useStyle
