import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  transactionDetailsInfo: {
    position: 'absolute',
    top: 5,
    right: 70,
    opacity: 1,
    zIndex: 1,
    transition: 'all .3s',
    transitionDelay: '.1s',
    backgroundColor: colors.invariant.componentIn2,
    width: 250,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: colors.white.main,
    padding: 16,
    marginBottom: 16,
    borderRadius: 5,
    '& p': {
      ...typography.body1
    }
  },
  detailsInfoWrapper: {
    height: 'auto',
    '& h2': {
      ...typography.body1
    },
    '& p': {
      ...typography.body3
    },
    '& span': {
      ...typography.label1,
      color: colors.invariant.lightInfoText
    }
  }
}))
