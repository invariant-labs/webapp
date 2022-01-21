import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.invariant.componentBcg
  }
}))

export const useTabsStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
    padding: 8,
    height: 28,
    minHeight: 28
  },
  indicator: {
    height: 28,
    borderRadius: 3,
    backgroundColor: colors.invariant.light
  },
  scrollable: {
    overflow: 'visible'
  },
  flexContainer: {
    justifyContent: 'space-between'
  }
}))

export const useSingleTabStyles = makeStyles(() => ({
  root: {
    zIndex: 1,
    textTransform: 'none',
    ...newTypography.body2,
    height: 28,
    minHeight: 28,
    color: colors.invariant.light,
    paddingInline: 0,

    '&:hover': {
      color: colors.invariant.lightHover,
      backgroundColor: colors.invariant.light,
      height: 28,
      borderRadius: 3

    }
  },
  selected: {
    ...newTypography.body1,
    color: colors.white.main,
    transition: 'color 300ms',

    '&:hover': {
      color: colors.white.main
    }
  }
}))

export default useStyles
