import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export const useLabelStyles = makeStyles(() => ({
  marketId: {
    fontFamily: 'Mukta',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.03px',
    textAlign: 'right',
    color: `${colors.invariant.textGrey} !important`,
    paddingRight: 7
  },
  clipboardIcon: {
    width: 15,
    height: 13,
    cursor: 'pointer'
  }
}))
