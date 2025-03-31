import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<{
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}>()((_theme, { top, left, right, bottom }) => ({
  tooltip: {
    color: colors.invariant.textGrey,
    ...typography.caption4,
    lineHeight: '24px',
    background: colors.invariant.component,
    borderRadius: 12,
    width: 'max-content',
    textAlign: 'center',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: top ? top : -30,
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom ? bottom : 'auto',
    boxShadow: `0px 2px 8px ${colors.invariant.black}`
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
  }
}))

export default useStyles
