import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.invariant.componentBcg,
    marginBottom: 40
  }
}))

export const useTabsStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
    padding: 8,
    height: 36,
    minHeight: 36,
    margin: '0px 7px'
  },
  indicator: {
    height: 36,
    borderRadius: 10,
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
    ...newTypography.body3,
    height: 36,
    minHeight: 36,
    color: colors.invariant.light,
    paddingInline: 0,

    '&:hover': {
      color: colors.invariant.lightHover,
      backgroundColor: colors.invariant.light,
      height: 36,
      borderRadius: 10
    }
  },
  selected: {
    ...newTypography.heading4,
    color: colors.white.main,
    transition: 'color 300ms',

    '&:hover': {
      color: colors.white.main
    }
  }
}))

export default useStyles
