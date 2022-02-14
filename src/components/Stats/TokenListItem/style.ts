import { makeStyles, Theme } from '@material-ui/core'
import { newTypography, colors } from '@static/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 35% 17.5% 12.5% 15% 15%',
    padding: '18px 0',
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
      paddingRight: 8
    }
  },
  tokenSymbol: {
    color: colors.invariant.textGrey,
    fontWeight: 400
  }
}))
