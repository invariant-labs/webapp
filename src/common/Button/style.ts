import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

type StyleProps = {
  scheme: 'normal' | 'green' | 'pink' | 'rainbow'
  height?: string | number
  width?: string | number
  borderRadius?: string | number
  padding?: string | number
  margin?: string | number
}

const getStyles = (scheme: 'normal' | 'green' | 'pink' | 'rainbow') => {
  switch (scheme) {
    case 'normal':
      return {
        background: colors.invariant.normal,
        color: colors.invariant.text,
        backgroundHover: colors.invariant.light,
        boxShadow: colors.invariant.light
      }
    case 'green':
      return {
        background: colors.invariant.greenLinearGradient,
        color: colors.invariant.newDark,
        backgroundHover: colors.invariant.greenLinearGradient,
        boxShadow: 'rgba(46, 224, 154, 0.5)'
      }
    case 'pink':
      return {
        background: colors.invariant.pinkLinearGradient,
        color: colors.invariant.newDark,
        backgroundHover: colors.invariant.pinkLinearGradient,
        boxShadow: 'rgba(239, 132, 245, 0.5)'
      }
    case 'rainbow':
      return {
        color: colors.invariant.text,
        boxShadow: colors.invariant.light
      }
  }
}

const useStyles = makeStyles<StyleProps>()(
  (_theme, { scheme, height, width, borderRadius, padding, margin }) => ({
    button: {
      height: height ?? 40,
      width: width ?? 'auto',
      minWidth: 0,
      margin: margin ?? '0',
      padding: padding ?? '0 12px',
      background: getStyles(scheme).background,
      color: getStyles(scheme).color,
      borderRadius: borderRadius ?? 14,
      textTransform: 'none',
      ...typography.body1,

      '&:hover': {
        boxShadow: `0 0 12px ${getStyles(scheme).boxShadow}`,
        ...(scheme === 'rainbow' ? {} : { background: getStyles(scheme).backgroundHover })
      }
    },
    buttonDisabled: {
      color: colors.invariant.textGrey,
      background: colors.invariant.light,
      cursor: 'not-allowed',

      '&:hover': {
        boxShadow: 'none',
        background: colors.invariant.light
      }
    },
    buttonRainbowBorder: {
      border: '2px solid transparent',
      backgroundImage: `linear-gradient(${colors.invariant.normal}, ${colors.invariant.normal}), linear-gradient(0deg, ${colors.invariant.green}, ${colors.invariant.pink})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }
  })
)

export default useStyles
