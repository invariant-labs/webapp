import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Mukta',
    ...newTypography.caption2,
    color: colors.invariant.textLightGrey,
    paddingBottom: '16px',
    margin: '0'
  },
  logoValues: {
    display: 'flex',
    width: '100%'
  },
  logo: {
    paddingRight: '20px'
  },
  allValues: {
    margin: '0',
    display: 'flex',
    flexDirection: 'column'
  },
  valueBold: {
    fontFamily: 'Mukta',
    ...newTypography.heading4,
    color: colors.invariant.text
  },
  valuesBottom: {
    fontFamily: 'Mukta',
    ...newTypography.caption4,
    color: colors.invariant.textLightGrey,
    display: 'inline-flex',
    gap: '16px',
    justifyContent: 'flex-start'
  }
}))

export default useStyles
