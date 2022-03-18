import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useThumbStyles = makeStyles(() => ({
  root: {
    width: 54,
    position: 'absolute',
    top: -26,
    transform: 'translateX(-22px)',
    outline: 'none'
  },
  labelWrapper: {
    width: 54,
    height: 20,
    borderRadius: 7,
    background: colors.invariant.light,
    marginBottom: 8
  },
  label: {
    color: colors.invariant.text,
    ...typography.caption1,
    textAlign: 'center'
  },
  outerCircle: {
    background: colors.invariant.pinkLinearGradient,
    width: 28,
    height: 28,
    borderRadius: '100%',
    padding: 6,
    boxSizing: 'border-box'
  },
  innerCircle: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #A2A2A2 100%)',
    width: 16,
    height: 16,
    borderRadius: '100%'
  }
}))

export const useSliderStyles = makeStyles<Theme, { valuesLength: number }>(() => ({
  root: {
    width: '100%'
  },
  track: {
    background: colors.invariant.dark,
    height: 6
  },
  rail: {
    background: colors.invariant.dark,
    height: 6,
    opacity: 1
  },
  markLabel: {
    color: colors.invariant.text,
    ...typography.body1,
    marginTop: 10
  },
  mark: ({ valuesLength }) => ({
    display: 'none',

    [`&[data-index="${valuesLength - 1}"], &[data-index="0"]`]: {
      display: 'block',
      width: 14,
      height: 14,
      background: colors.invariant.dark,
      borderRadius: '100%',
      transform: 'translate(-6px, -4px)'
    }
  })
}))
