import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.invariant.componentIn1
  }
}))

export const useTabsStyles = makeStyles(() => ({
  root: { overflow: 'visible' },
  indicator: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut2
  },
  scrollable: {
    overflow: 'visible'
  },
  scrollButtons: {
    color: 'white'
  },
  flexContainer: {
    justifyContent: 'space-around'
  }
}))

export const useSingleTabStyles = makeStyles(() => ({
  root: {
    zIndex: 1,
    textTransform: 'capitalize',
    ...newTypography.body2,
    minHeight: 28,
    minWidth: 101,
    color: colors.invariant.componentOut3,

    '&:hover': {
      color: colors.invariant.lightInfoText
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
