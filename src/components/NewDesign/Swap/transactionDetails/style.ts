import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

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
      ...newTypography.body1
    }
  },
  detailsInfoWrapper: {
    height: 'auto',
    '& h2': {
      ...newTypography.body1
    },
    '& p': {
      ...newTypography.body3
    },
    '& span': {
      ...newTypography.label1,
      color: colors.invariant.lightInfoText
    }
  }
}))
