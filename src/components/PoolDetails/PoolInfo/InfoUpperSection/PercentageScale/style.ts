import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{
  leftPercentage: number
  colorLeft: string
  colorRight: string
}>()((_theme, { leftPercentage, colorLeft, colorRight }) => ({
  icon: {
    borderRadius: '100%',
    height: 36,
    width: 36
  },
  dot: {
    backgroundColor: colors.invariant.textGrey,
    borderRadius: '100%',
    height: 14,
    width: 14
  },
  scaleContainer: {
    backgroundColor: colorRight,
    height: 8,
    flex: 1,
    position: 'relative'
  },
  leftScale: {
    backgroundColor: colorLeft,
    height: 8,
    width: `${leftPercentage}%`,
    position: 'absolute',
    borderRadius: 6,
    left: 0,
    top: 0
  },
  leftDot: {
    position: 'absolute',
    left: -5,
    top: -3,
    zIndex: 1,
    backgroundColor: colorLeft || colors.invariant.textGrey
  },
  rightDot: {
    position: 'absolute',
    right: -5,

    top: -3,
    zIndex: 1,
    backgroundColor: colorRight || colors.invariant.textGrey
  }
}))

export default useStyles
