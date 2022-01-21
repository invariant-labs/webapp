import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
import { background } from '@storybook/theming'

const useStyles = makeStyles((theme: Theme) => ({
  statsListItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  statsListItemLabel: {
    ...typography.body3,
    color: colors.invariant.lightInfoText,
    height: 9
  },
  statsListItemEstimate: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 18,
    gap: 8
  },
  statsListItemEstimateExact: {
    ...typography.heading4,
    color: colors.white.main,
    height: 12,
    lineHeight: '12px'
  },
  logo: {
    minWidth: 27,
    height: 32
  }
}))

export default useStyles
