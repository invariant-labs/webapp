import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  infoTypeLabel: {
    textTransform: 'uppercase',
    color: colors.invariant.lightInfoText,
    ...typography.body1,
    lineHeight: '35px'
  },
  infoTypeSwap: {
    display: 'flex',
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: 5,
    lineHeight: '35px'
  },
  infoType: {
    backgroundColor: colors.invariant.componentOut3,
    borderRadius: 5,
    textAlign: 'center',
    width: 61
  },
  infoSwap: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    width: '100%'
  },
  infoAmount: {
    color: colors.white.main,
    paddingRight: 5,
    ...typography.body1,
    lineHeight: '35px'
  },
  infoSwapToken: {
    color: colors.invariant.lightInfoText,
    ...typography.body1,
    lineHeight: '35px'
  }
}))

export default useStyles
