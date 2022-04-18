import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export const useTabsStyles = makeStyles<Theme, { value: number }>((theme: Theme) => ({
  root: {
    overflow: 'visible',
    height: 20,
    minHeight: 20,
    borderRadius: 5,
    width: '100%',
    maxWidth: 117,
    backgroundColor: colors.invariant.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: ({ value }) => ({
    height: 20,
    borderRadius: 5,
    background: colors.invariant.greenLinearGradient
  }),
  scrollable: {
    overflow: 'hidden'
  },
  flexContainer: {
    justifyContent: 'space-between'
  }
}))

export const useSingleTabStyles = makeStyles((theme: Theme) => ({
  root: {
    textTransform: 'none',
    zIndex: 1,
    height: 20,
    minHeight: 20,
    paddingInline: 0,
    minWidth: 39,
    width: 39,
    ...typography.caption2,
    color: colors.invariant.light,
    transition: 'color 300ms',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      color: colors.invariant.lightHover
    }
  },
  selected: {
    ...typography.caption1,
    color: colors.invariant.black,

    '&:hover': {
      color: colors.invariant.black
    }
  }
}))
