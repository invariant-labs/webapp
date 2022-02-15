import { makeStyles } from '@material-ui/core'
import { colors, newTypography } from '@static/theme'

const useStyle = makeStyles(() => ({
  container: {
    width: 1072,
    color: colors.invariant.textGrey,
    fontWeight: 400,
    display: 'grid',
    gridTemplateColumns: '5% 55% 12% 17% 15% 15%',
    padding: '18px 0',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`
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
        ...newTypography.heading4,
        fontWeight: 400
      }
    }
  },
  symbolsContainer: {
    marginLeft: 10
  }
}))

export default useStyle
