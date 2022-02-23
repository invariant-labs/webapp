import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.invariant.componentBcg,
    marginBottom: 32
  },
  bestText: {},
  bestWrapper: {}
}))

export const useTabsStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
    height: 36,
    minHeight: 36,
    margin: '4px 4px',
    borderRadius: 10
  },
  indicator: {
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.invariant.light
  },
  scrollable: {
    overflow: 'hidden'
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
    minWidth: 50,
    width: 50,
    marginRight: '7px',

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
  best: {},
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
