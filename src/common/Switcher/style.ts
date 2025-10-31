import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

interface StyleProps {
  value: string
  dark?: boolean
  fullWidth?: boolean
  itemWidth?: number
}

const useStyles = makeStyles<StyleProps>()((theme, { dark, fullWidth, itemWidth }) => ({
  container: {
    backgroundColor: dark ? colors.invariant.newDark : colors.invariant.component,
    borderRadius: 10,
    boxSizing: 'border-box',
    width: fullWidth ? '100%' : 'auto',
    marginLeft: 'auto'
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    width: fullWidth ? '100%' : 'auto'
  },
  switchWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: fullWidth ? '100%' : 'auto',
    flexWrap: 'wrap-reverse'
  },
  switchPoolsContainer: {
    position: 'relative',
    width: 'fit-content',
    backgroundColor: dark ? colors.invariant.newDark : colors.invariant.component,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'inline-flex',
    height: 32,
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: '100%'
    }
  },
  switchPoolsMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    transition: 'transform 0.3s ease',
    zIndex: 1
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
    width: itemWidth ? itemWidth : 60,
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
  }
}))

export default useStyles
