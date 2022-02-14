import { makeStyles, Theme } from '@material-ui/core'
import { newTypography, colors } from '@static/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '5% 40% 12.5% 12.5% 15% 15%',
    padding: '18px 0',
    color: colors.white.main,
    backgroundColor: colors.invariant.component,
    borderBottom: `1px solid ${colors.invariant.light}`,
    '& p': {
      ...newTypography.heading4
    }
  }
}))
