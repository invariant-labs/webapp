import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export const useTabsStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
    height: 26,
    minHeight: 26,
    borderRadius: 9,
    width: 92,
    backgroundColor: colors.invariant.black
  },
  indicator: {
    height: 26,
    borderRadius: 9,
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
    height: 26,
    minHeight: 26,
    paddingInline: 0,
    minWidth: 46,
    width: 46,

    '&:hover': {
      backgroundColor: colors.invariant.light,
      height: 26,
      borderRadius: 9
    }
  },
  selected: {
    transition: 'color 300ms'
  }
}))
