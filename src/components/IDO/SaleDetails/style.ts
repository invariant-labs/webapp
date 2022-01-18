import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    borderRadius: 10,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'

    // '&:first-child': {
    //   borderTopLeftRadius: 10,
    //   borderTopRightRadius: 10
    // },
    // '&:last-child': {
    //   borderBottomLeftRadius: 10,
    //   borderBottomRightRadius: 10
    // }
  },
  listItem: {
    alignItems: 'center',
    padding: 16,
    width: 240
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
    width: 15,
    height: 15,
    margin: '0 8px',
    color: colors.white.main,
    borderRadius: '50%'
  },
  listData: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
