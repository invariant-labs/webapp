import { makeStyles } from '@material-ui/core'
import { newTypography, colors } from '@static/theme'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 35% 17.5% 12.5% 15% 15%',
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`
  },
  tokenList: {
    color: colors.white.main,
    '& p': {
      ...newTypography.heading4
    }
  },

  header: {
    '& p': {
      ...newTypography.heading4,
      fontWeight: 400
    }
  },

  tokenName: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 28,
      marginRight: 8,
      borderRadius: '50%'
    }
  },

  tokenSymbol: {
    color: colors.invariant.textGrey,
    fontWeight: 400
  }
}))
