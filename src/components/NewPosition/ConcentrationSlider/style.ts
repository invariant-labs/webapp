import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useThumbStyles = makeStyles(() => ({
  root: {
    width: 60,
    position: 'absolute',
    top: -26,
    transform: 'translateX(-30px)',
    outline: 'none'
  },
  labelWrapper: {
    width: 60,
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

export const useSliderStyles = makeStyles<Theme, { valuesLength: number; unsafePercent: number }>(
  () => ({
    root: {
      width: '100%'
    },
    rail: ({ unsafePercent }) => ({
      background: `linear-gradient(90deg, #2EE09A 0%, #2EE09A ${unsafePercent}%, #FB555F ${Math.min(
        unsafePercent + 5,
        100
      )}%)`,
      height: 6,
      opacity: 1
    }),
    markLabel: ({ valuesLength }) => ({
      color: colors.invariant.text,
      ...typography.body1,
      marginTop: 10,

      '&[data-index="0"]': {
        transform: 'translateX(-30%)'
      },

      [`&[data-index="${valuesLength - 1}"]`]: {
        transform: 'translateX(-90%)'
      }
    }),
    mark: ({ valuesLength }) => ({
      display: 'none',

      [`&[data-index="${valuesLength - 1}"], &[data-index="0"]`]: {
        display: 'block',
        width: 14,
        height: 14,
        borderRadius: '100%',
        transform: 'translate(-6px, -4px)'
      },

      '&[data-index="0"]': {
        background: colors.invariant.green
      },

      [`&[data-index="${valuesLength - 1}"]`]: {
        background: colors.invariant.Error
      }
    })
  })
)
