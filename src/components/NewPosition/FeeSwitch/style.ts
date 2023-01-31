import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.invariant.componentBcg,
    marginBottom: 8
  },
  bestText: {
    color: colors.invariant.green,
    position: 'absolute',
    ...typography.caption1,
    textAlign: 'center',
    top: 40
  }
}))

export const useTabsStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
    height: 60,
    minHeight: 60,
    margin: '4px 4px',
    borderRadius: 10
  },
  indicator: {
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.invariant.light
  },
  flexContainer: {
    justifyContent: 'space-between'
  }
}))

export const useSingleTabStyles = makeStyles(() => ({
  root: {
    zIndex: 1,
    textTransform: 'none',
    ...typography.body3,
    height: 36,
    minHeight: 36,
    color: colors.invariant.light,
    paddingInline: 0,
    minWidth: 65,
    width: 65,
    marginRight: '7px',
    position: 'relative',
    overflow: 'visible',

    '&:hover': {
      color: colors.invariant.lightHover,
      backgroundColor: colors.invariant.light,
      height: 36,
      borderRadius: 10
    },

    '&:last-of-type': {
      marginRight: 0
    }
  },
  best: {
    color: colors.invariant.green,
    border: `2px solid ${colors.invariant.green}`,
    borderRadius: 10,

    '&:hover': {
      color: colors.invariant.green
    }
  },
  selected: {
    ...typography.heading4,
    color: colors.white.main,
    transition: 'color 300ms',

    '&:hover': {
      color: colors.white.main
    }
  }
}))

export default useStyles
