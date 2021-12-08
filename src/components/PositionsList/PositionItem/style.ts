import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.componentOut1,
    borderRadius: 10,
    padding: 20,

    '&:not(:last-child)': {
      marginBottom: 20
    }
  },
  icons: {
    marginRight: 20,
    width: 'fit-content'
  },
  tokenIcon: {
    width: 40
  },
  arrows: {
    width: 25
  },
  names: {
    marginRight: 20,
    ...typography.heading1,
    color: colors.white.main,
    lineHeight: '40px'
  },
  infoText: {
    ...typography.body1,
    color: colors.invariant.lightInfoText
  },
  greenText: {
    ...typography.body1,
    color: colors.invariant.accent2
  },
  liquidity: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    marginRight: 8,
    width: 170
  },
  fee: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    marginRight: 8,
    width: 90
  },
  minMax: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    marginRight: 8,
    width: 331,
    paddingInline: 10
  },
  value: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    width: 164,
    paddingInline: 12
  }
}))

export default useStyles
