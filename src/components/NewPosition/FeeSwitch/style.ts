import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.invariant.componentBcg
  },
  bestText: {
    color: colors.invariant.green,
    position: 'relative',
    transition: 'left 300ms',
    ...typography.caption1,
    textAlign: 'center'
  },
  bestWrapper: {
    width: '100%',
    height: 25,
    paddingBlock: 4,
    marginBottom: 7
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

export const useSingleTabStyles = makeStyles(() => ({
  root: {
    zIndex: 1,
    textTransform: 'none',
    ...typography.body3,
    height: 36,
    minHeight: 36,
    color: colors.invariant.light,
    paddingInline: 0,
    minWidth: 60,
    width: 60,
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
