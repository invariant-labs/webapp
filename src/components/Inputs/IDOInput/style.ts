import { makeStyles } from '@material-ui/core'
import { CenterFocusStrong } from '@material-ui/icons'
import { colors, newTypography } from '@static/theme'
import { color } from '@storybook/addon-knobs'

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.componentDark,
    boxSizing: 'border-box',
    padding: '12px 12px 6px 12px',
    borderRadius: '16px',
    width: '368px',
    height: '84px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: colors.invariant.light,
    borderRadius: '12px',
    height: '36px',
    width: '86px',
    padding: '6px'
  },
  value: {
    fontFamily: 'Mukta',
    ...newTypography.heading2,
    color: colors.invariant.text
  },
  maxButton: {
    fontFamily: 'Mukta',
    ...newTypography.tiny2,
    color: colors.invariant.dark,
    padding: '1px',
    margin: '0 4px',
    width: 26,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.invariant.green,
    border: 'none'
  },
  balance: {
    fontFamily: 'Mukta',
    ...newTypography.caption2,
    color: colors.invariant.textLightGrey,
    display: 'flex',
    alignItems: 'center'
  },
  rightBottom: {
    display: 'flex',
    flexDirection: 'row'
  },
  percentGeneral: {
    fontFamily: 'Mukta',
    ...newTypography.tiny1,
    padding: '2px',
    width: 39,
    height: 16,
    textAlign: 'center',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  percentPlus: {
    color: colors.invariant.green,
    backgroundColor: `${colors.invariant.green}20`
  },
  percentMinus: {
    color: colors.invariant.error,
    backgroundColor: `${colors.invariant.error}20`
  },
  bigNumberRightBottom: {
    fontFamily: 'Mukta',
    ...newTypography.caption2,
    color: colors.invariant.textLightGrey,
    marginLeft: '5px'
  }
}))

export default useStyles
