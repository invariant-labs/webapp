import { makeStyles } from 'tss-react/mui'
import { colors } from '@static/theme'

const useStyles = makeStyles<{
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  increasePadding?: boolean
  maxWidth?: string | number
}>()((_theme, { top, left, right, bottom, fullSpan, increasePadding, maxWidth }) => ({
  popover: {
    minWidth: 'fit-content',
    background: 'none',
    top: top ? top : 'auto',
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom ? bottom : 'auto',
    padding: 0,
    margin: 8
  },
  contentBox: {
    padding: increasePadding ? '16px 24px' : '8px 12px',
    background: colors.invariant.component,
    overflow: 'hidden',
    borderRadius: 12,
    pointerEvents: 'auto',
    maxWidth: maxWidth || 'none'
  },
  tooltipSpan: {
    width: fullSpan ? '100%' : 'auto',
    display: 'inline-flex',
    margin: 0,
    padding: 0
  }
}))

export default useStyles
