import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{
  borderWidth: number
  borderColor?: string
  opacity?: number
  backgroundColor?: string
  borderRadius: number
}>()((_theme, { borderWidth, borderColor, opacity, backgroundColor, borderRadius }) => ({
  rootContainer: {
    position: 'relative'
  },
  gradientContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: `calc((${borderWidth}px / 2) + ${borderRadius}px)`,
    padding: borderWidth ?? 1
  },
  gradient: {
    zIndex: 1,
    background:
      borderColor ??
      `linear-gradient(to bottom, ${colors.invariant.green}, ${colors.invariant.pink})`,
    opacity: opacity ?? 1,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: borderWidth ?? 1,
      left: borderWidth ?? 1,
      right: borderWidth ?? 1,
      bottom: borderWidth ?? 1,
      borderRadius: borderRadius ?? 10,
      background: backgroundColor ?? colors.invariant.bodyBackground,
      maskComposite: 'exclude',
      zIndex: -1
    }
  },
  positionAbsolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.invariant.transparentBcg,
    overflow: 'hidden',
    borderRadius: `calc((${borderWidth}px / 2) + ${borderRadius}px)`
  },
  innerContainer: {
    borderRadius: borderRadius ?? 10
  },
  noBackground: {}
}))
