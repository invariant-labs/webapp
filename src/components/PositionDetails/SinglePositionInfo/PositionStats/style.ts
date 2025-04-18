import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  statWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,

    [theme.breakpoints.up(432)]: {
      flexDirection: 'row'
    }
  },
  statContainer: {
    background: colors.invariant.newDark,
    padding: '6px 8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,

    [theme.breakpoints.up(432)]: {
      width: '100%'
    }
  },
  statName: {
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  statValue: {
    ...typography.body1,
    color: colors.white.main
  },
  statContainerHiglight: {
    background: colors.invariant.light
  },
  statValueHiglight: {
    color: colors.invariant.green
  },
  statCOntainerRainbow: {
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(#111931, #111931), linear-gradient(0deg, #2EE09A, #EF84F5)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box'
  }
}))
