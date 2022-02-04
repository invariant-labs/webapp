import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.invariant.componentBcg,
    marginBottom: 32
  }
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

export const useSingleTabStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 1,
    textTransform: 'none',
    ...newTypography.body3,
    height: 36,
    minHeight: 36,
    color: colors.invariant.light,
    paddingInline: 0,
    minWidth: 50,
    width: 50,
    marginRight: '7px',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      top: 2,
      ...newTypography.body2
    },

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
  selected: {
    ...newTypography.heading4,
    color: colors.white.main,
    transition: 'color 300ms',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      top: 2,
      ...newTypography.body1
    },

    '&:hover': {
      color: colors.white.main
    }
  }
}))

export default useStyles
