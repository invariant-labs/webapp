import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    borderRadius: 10,
    paddingInline: 10,
    height: 64,
    fontSize: 30,
    fontWeight: 600,
    width: '100%'
  },
  maxButton: {
    ...typography.body1,
    width: 84,
    height: 40,
    borderRadius: 5,
    marginLeft: 8
  },
  select: {
    marginRight: 24
  },
  input: {
    paddingTop: 4
  },
  label: {
    top: -1
  }
}))

export default useStyles
