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

export const useTabsStyles = makeStyles()(() => {
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
      '& svg': {
        fill: colors.invariant.text
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
