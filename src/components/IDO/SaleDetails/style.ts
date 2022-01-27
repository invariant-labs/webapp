import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: '1 1 0%',
    maxWidth: 240,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '100%'
    }
  },
  listItem: {
    alignItems: 'center',
    padding: 16,

    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  inputLabel: {
    ...typography.body3,
    lineHeight: 1,
    color: colors.invariant.lightInfoText
  },
  title: {
    color: colors.white.main,
    ...typography.heading4
  },
  icon: {
    height: 15,
    marginRight: '8px',
    color: colors.white.main
  },
  invariantIcon: {
    width: 19
  },
  tokenIcon: {
    width: 15,
    borderRadius: '50%'
  },
  listData: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
