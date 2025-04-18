import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<{
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
}>()((_theme, { top, left, right, bottom, fullSpan }) => ({
  tooltip: {
    color: colors.invariant.textGrey,
    ...typography.body2,
    lineHeight: '24px',
    background: colors.invariant.component,
    borderRadius: 12,
    width: 'max-content',
    textAlign: 'center',
    padding: '8px 12px',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: top ? top : -30,
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom ? bottom : 'auto',
    boxShadow: `0px 2px 8px ${colors.invariant.black}`
  },
  tooltipGradient: {
    minWidth: 'fit-content',
    position: 'relative',
    borderRadius: 14,
    background: colors.invariant.component,
    ...typography.body2,
    color: colors.invariant.textGrey,
    padding: '16px 24px',
    top: top ? top : -30,
    pointerEvents: 'auto',
    marginTop: '14px !important',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-1px', // border thickness
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      zIndex: -1,
      borderRadius: 14,
      background: colors.invariant.pinkGreenLinearGradient,
      boxSizing: 'border-box'
    }
  },
  tooltipNoGradient: {
    minWidth: 'fit-content',
    position: 'relative',
    borderRadius: 14,
    background: colors.invariant.component,
    ...typography.body2,
    color: colors.invariant.textGrey,
    padding: '16px 24px',
    top: top ? top : -30,
    boxShadow: `0px 0px 4px ${colors.invariant.black}`
  },
  tooltipSpan: {
    width: fullSpan ? '100%' : 'auto',
    display: 'inline-flex',
    margin: 0,
    padding: 0
  }
}))

export default useStyles
