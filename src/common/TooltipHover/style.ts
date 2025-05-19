import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<{
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  increasePadding?: boolean
}>()((_theme, { top, left, right, bottom, fullSpan, increasePadding }) => ({
  tooltipGradient: {
    minWidth: 'fit-content',
    position: 'relative',
    borderRadius: 12,
    background: colors.invariant.component,
    ...typography.body2,
    color: colors.invariant.textGrey,
    padding: increasePadding ? '16px 24px' : '8px 12px',
    top: top ? top : 'auto',
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom ? bottom : 'auto',
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
      borderRadius: 12,
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
    top: top ? top : 0,
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom ? bottom : 'auto',
    boxShadow: `0px 2px 8px ${colors.invariant.black}`,
    padding: increasePadding ? '16px 24px' : '8px 12px'
  },
  tooltipSpan: {
    width: fullSpan ? '100%' : 'auto',
    display: 'inline-flex',
    margin: 0,
    padding: 0
  }
}))

export default useStyles
