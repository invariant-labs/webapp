import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: colors.invariant.component,
    padding: 24,
    borderRadius: 24,
    marginTop: 16,

    [theme.breakpoints.down('sm')]: {
      padding: '24px 8px'
    }
  },
  header: {
    ...typography.heading4,
    color: colors.invariant.text
  },
  separator: {
    borderBottom: `1px solid ${colors.invariant.light}`,
    width: '100%',
    margin: '24px 0'
  }
}))

export default useStyles
