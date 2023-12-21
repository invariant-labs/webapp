import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export const useLabelStyles = makeStyles(() => ({
  marketId: {
    fontFamily: 'Mukta',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-3%',
    textAlign: 'right',
    color: `${colors.invariant.textGrey} !important`,
    paddingRight: 10
  },
  clipboardIcon: {
    width: 15,
    height: 15,
    paddingLeft: 3,
    cursor: 'pointer'
  }
}))
