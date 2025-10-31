import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
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
    },
    tabContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    tabTvl: {
      ...typography.caption3
    },
    tabSelectedTvl: {
      color: colors.invariant.textGrey
    }
  }
})

export const useTabsStyles = makeStyles<{
  isBestTierHiddenOnLeft: boolean
  isBestTierHiddenOnRight: boolean
  hasValidBestTier: boolean
  isPromotedPool: boolean
}>()((
  _theme,
  { isBestTierHiddenOnLeft, isBestTierHiddenOnRight, hasValidBestTier, isPromotedPool }
) => {
  return {
    root: {
      overflow: 'visible',
      height: 66,
      minHeight: 66,
      margin: '4px 4px',
      borderRadius: 10
    },
    indicator: {
      height: 66,
      borderRadius: 10,
      backgroundColor: colors.invariant.light,
      top: 0
    },
    flexContainer: {
      justifyContent: 'space-between'
    },
    scrollButtons: {
      width: 24,
      '&:first-of-type svg': {
        fill:
          isPromotedPool && isBestTierHiddenOnLeft
            ? colors.invariant.pink
            : !isPromotedPool && hasValidBestTier && isBestTierHiddenOnLeft
              ? colors.invariant.green
              : colors.invariant.text
      },
      '&:last-of-type svg': {
        fill:
          isPromotedPool && isBestTierHiddenOnRight
            ? colors.invariant.pink
            : !isPromotedPool && hasValidBestTier && isBestTierHiddenOnRight
              ? colors.invariant.green
              : colors.invariant.text
      },
      '&:hover svg': {
        transition: '0.3s',
        opacity: 0.7
      }
    }
  }
})

export const useSingleTabStyles = makeStyles()(() => {
  return {
    root: {
      zIndex: 1,
      textTransform: 'none',
      ...typography.body3,
      height: 66,
      minHeight: 66,
      color: colors.invariant.light,
      padding: 0,
      margin: 0,
      minWidth: 74,
      width: 74,
      marginRight: 4,
      position: 'relative',
      overflow: 'visible',
      transition: '300ms',
      borderRadius: 10,
      '&:hover': {
        color: colors.invariant.lightHover,
        backgroundColor: colors.invariant.light,
        '@media (hover: none)': {
          color: colors.invariant.light
        }
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
    promoted: {
      color: colors.invariant.pink,
      borderRadius: 10,
      border: '2px solid transparent',
      backgroundImage: `linear-gradient(${colors.invariant.newDark},${colors.invariant.newDark}), linear-gradient(0deg, #2EE09A, #EF84F5)`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      '&:hover': {
        color: colors.invariant.pink,
        backgroundImage:
          'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #2EE09A, #EF84F5)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      },
      '&.Mui-selected': {
        backgroundImage:
          'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #2EE09A, #EF84F5)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      }
    },
    selected: {
      ...typography.heading4,
      color: colors.white.main + ' !important',
      transition: 'color 300ms',
      '&:hover': {
        color: colors.white.main
      }
    }
  }
})

export default useStyles
