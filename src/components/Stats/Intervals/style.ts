import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

interface StyleProps {
  interval: string
}

const useStyles = makeStyles<StyleProps>()((theme, { interval }) => {
  const getMarkerPosition = (interval: string) => {
    switch (interval) {
      case '24H':
        return '0'
      case '1W':
        return '100%'
      case '1M':
        return '200%'
      case '1Y':
        return '300%'
      default:
        return '0'
    }
  }

  return {
    container: {
      backgroundColor: colors.invariant.component,
      borderRadius: 8,
      boxSizing: 'border-box',
      marginLeft: 'auto'
    },
    mainWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      width: '100%'
    },
    switchWrapper: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap-reverse'
    },
    switchPoolsContainer: {
      position: 'relative',
      width: 'fit-content',
      backgroundColor: colors.invariant.component,
      borderRadius: 10,
      overflow: 'hidden',
      display: 'inline-flex',
      height: 32,

      [theme.breakpoints.down('md')]: {
        width: '95%'
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
        width: '100%'
      }
    },
    switchPoolsMarker: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 'calc(100% / 4)',
      backgroundColor: colors.invariant.light,
      borderRadius: 10,
      transition: 'transform 0.3s ease',
      zIndex: 1,
      transform: `translateX(${getMarkerPosition(interval)})`
    },
    switchPoolsButtonsGroup: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      width: '100%'
    },
    switchPoolsButton: {
      ...typography.body2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      flex: 1,
      width: 60,
      minWidth: 'unset',
      textTransform: 'none',
      textWrap: 'nowrap',
      border: 'none',
      borderRadius: 10,
      zIndex: 2,
      transition: '300ms',
      '&.Mui-selected': {
        backgroundColor: 'transparent'
      },
      '&:hover': {
        filter: 'brightness(1.2)',
        borderRadius: 10
      },
      '&.Mui-selected:hover': {
        backgroundColor: 'transparent'
      },
      '&:disabled': {
        color: colors.invariant.componentBcg,
        pointerEvents: 'auto',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 'none',
          cursor: 'not-allowed',
          filter: 'brightness(1.15)',
          '@media (hover: none)': {
            filter: 'none'
          }
        }
      },
      letterSpacing: '-0.03em',
      paddingTop: 6,
      paddingBottom: 6
    },
    leaderboardHeaderSectionTitle: { ...typography.heading3, color: colors.white.main }
  }
})

export default useStyles
